import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "../stack-page/Stack.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./utils";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState("");
  const st= useRef<Stack<any>>();
  const [color, setColor] = useState(ElementStates.Default);
  const [stack, setStack] = useState<any[]>();
  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };
  useEffect(() => {
    st.current = new Stack<any>();
  }, []);
  const push = async () => {
    if (value === "") {
      return;
    }
    setColor(ElementStates.Changing);
    st.current?.push(value);
    setStack(st.current?.container);
    setValue("");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setColor(ElementStates.Default);
  };

  const pop = async () => {
    setColor(ElementStates.Changing);
    await new Promise((resolve) => setTimeout(resolve, 500));
    st.current?.pop();
    setStack(st.current?.container);
    setColor(ElementStates.Default);
  };

  const clear = () => {
    st.current?.clear();
    setStack(st.current?.container);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input
          maxLength={4}
          isLimitText={true}
          onChange={handleChange}
          value={value}
          ending={"a"}
        />
        <Button
          type="submit"
          text="Добавить"
          onClick={push}
          disabled={value === "" ? true : false}
          style={{minWidth: "120px"}}
        />
        <Button
          text="Удалить"
          style={{minWidth: "120px", marginRight: "60px" }}
          onClick={pop}
          disabled={stack && stack.length > 0 ? false : true}
        />
        <Button
          text="Очистить"
          onClick={clear}
          disabled={stack && stack.length > 0 ? false : true}
          style={{minWidth: "120px"}}
        />
      </div>
      <div className={styles.stack}>
        {stack &&
          stack.map((el, i) => {
            const length = st.current?.getSize();
            if (length && i === length - 1) {
              return (
                <Circle
                  key={i}
                  letter={el}
                  index={i}
                  head={"top"}
                  state={color}
                />
              );
            } else return <Circle key={i} letter={el} index={i} />;
          })}
      </div>
    </SolutionLayout>
  );
};
