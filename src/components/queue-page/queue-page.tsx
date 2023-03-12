import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "../queue-page/Queue.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Queue } from "./utils";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState("");
  const q = useRef<Queue<string>>();
  const [color, setColor] = useState(ElementStates.Default);
  const [colorHead, setColorHead] = useState(ElementStates.Default);
  const [colorTail, setColorTail] = useState(ElementStates.Default);
  const [queue, setQueue] = useState<(string | null)[] | undefined>([]);
  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };
  useEffect(() => {
    q.current = new Queue<string>(7);
    if (q.current) {
      setQueue(q.current.elements);
    }
  }, []);
  const isEmpty = q.current?.isEmpty();
  const enqueue = async () => {
    if (value === "") {
      return;
    }

    changeColor(1000);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setColorTail(ElementStates.Changing);
    q.current?.enqueue(value);
    setQueue(q.current?.elements);
    setValue("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setColorHead(ElementStates.Default);
    setColorTail(ElementStates.Default);
  };

  const changeColor = async (delay: number) => {
    setColor(ElementStates.Changing);
    await new Promise((res) => setTimeout(res, delay));
    setColor(ElementStates.Default);
  };

  const dequeue = async () => {
    setColorHead(ElementStates.Changing);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    q.current?.dequeue();
    if (q.current) {
      const queueUpdated = [...q.current.elements];
      setQueue(queueUpdated);
    }
    setColorHead(ElementStates.Default);
  };

  const clear = () => {
    q.current?.clear();
    setQueue(q.current?.elements);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <Input
          maxLength={4}
          isLimitText={true}
          onChange={handleChange}
          value={value}
          ending={"a"}
          disabled={colorTail === ElementStates.Changing || color === ElementStates.Changing ? true : false}
        />
        <Button
          type="submit"
          text="Добавить"
          onClick={enqueue}
          disabled={
            (value === "" || q.current?.tail === q.current?.size) ? true : false
          }
          style={{ minWidth: "120px" }}
          isLoader={colorTail === ElementStates.Changing || color === ElementStates.Changing ? true : false}
          id="add"
        />
        <Button
          text="Удалить"
          style={{ marginRight: "75px", minWidth: "108px" }}
          onClick={dequeue}
          disabled={isEmpty || colorHead === ElementStates.Changing || colorTail === ElementStates.Changing || color === ElementStates.Changing ? true : false}
          isLoader={colorHead === ElementStates.Changing ? true : false}
          id="delete"
        />
        <Button
          text="Очистить"
          onClick={clear}
          disabled={(isEmpty && q.current?.tail !== q.current?.size)
            || colorHead === ElementStates.Changing
            || colorTail === ElementStates.Changing
            || color === ElementStates.Changing
            ? true : false}
          style={{ minWidth: "120px" }}
          id="clear"
        />
      </div>
      <div className={styles.queue}>
        {queue?.map((el, i) => {
          if (
            q.current &&
            el !== null &&
            q.current?.head === q.current?.tail - 1
          ) {
            return (
              <Circle
                key={i}
                letter={el}
                index={i}
                head={"head"}
                tail={"tail"}
                state={colorHead}
              />
            );
          }
          if (el !== null && i === q?.current?.head) {
            return (
              <Circle
                key={i}
                letter={el}
                index={i}
                head={"head"}
                state={colorHead}
              />
            );
          }
          if (q.current && el !== null && i === q.current.tail - 1) {
            return (
              <Circle
                key={i}
                letter={el}
                index={i}
                tail={"tail"}
                state={colorTail}
              />
            );
          }
          else return (
            <Circle
              key={i}
              letter={el}
              index={i}
              state={
                q.current && i === q.current?.tail
                  ? color
                  : ElementStates.Default
              }
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
