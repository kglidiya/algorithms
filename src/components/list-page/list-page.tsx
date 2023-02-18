import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "../list-page/List.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList, Node, ILinkedList } from "./utils";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { randomArr } from "../../utils/randomArr";
import { useForm } from "../../hooks/useForm";

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({
    value: "",
    index: "",
  });
  const [isChangingTail, setIsChangingTail] = useState(false);
  const [isChangingHead, setIsChangingHead] = useState(false);
  const [headToDelete, setHeadToDelete] = useState(false);
  const [tailToDelete, setTailToDelete] = useState(false);
  const [isAddByIndex, setIsAddByIndex] = useState(false);
  const [atIndex, setAtIndex] = useState(false);
  const [isDeleteByIndex, setIsDeleteByIndex] = useState(false);
  const [count, setCount] = useState(-1);
  const [colorHead, setColorHead] = useState(ElementStates.Default);
  const [colorTail, setColorTail] = useState(ElementStates.Default);
  const [list, setList] = useState<string[]>([]);
  const l = useRef() as MutableRefObject<LinkedList<string>>;

  useEffect(() => {
    l.current = new LinkedList<string>();
    const arrInit = randomArr(4, 6)
    for (let i = 0; i < arrInit.length; i++) {
      l.current.append(String(arrInit[i]))
    }
    const list = l.current.toArray();
    const arr: string[] = [];
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
    }
  }, []);
  const [size, setSize] = useState(0)
  useMemo(() => {
    if (l.current) {
      const s = l.current.getSize()
      setSize(s)
    }
  }, [l.current?.getSize()])

  const changeColorHead = async (delay: number) => {
    setColorHead(ElementStates.Modified);
    await new Promise((res) => setTimeout(res, delay));
    setColorHead(ElementStates.Default);
  };

  const changeColorTail = async (delay: number) => {
    setColorTail(ElementStates.Modified);
    await new Promise((res) => setTimeout(res, delay));
    setColorTail(ElementStates.Default);
  };

  const append = async () => {
    setIsChangingTail(true);
    if (size === 0) setList([""]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsChangingTail(false);
    l.current?.append(values.value);
    const list = l.current?.toArray();
    const arr: string[] = [];
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
    }
    setValues({ value: "", index: "" });
    changeColorTail(1000);
  };

  const prepend = async () => {
    setIsChangingHead(true);
    if (l.current?.getSize() === 0) setList([""]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsChangingHead(false);
    l.current?.prepend(values.value);
    const list = l.current?.toArray();
    const arr: string[] = [];
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
    }
    setValues({ value: "", index: "" });
    changeColorHead(1000);
  };

  const deleteHead = async () => {
    setIsChangingHead(true);
    setHeadToDelete(true);
    l.current?.deleteHead();
    const list = l.current?.toArray();
    const arr: string[] = [];
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
    }
    setHeadToDelete(false);
    setIsChangingHead(false);
  };

  const deleteTail = async () => {
    setIsChangingTail(true);
    setTailToDelete(true);
    l.current?.deleteTail();
    const list = l.current?.toArray();
    const arr: string[] = [];
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
    }
    setTailToDelete(false);
    setIsChangingTail(false);
  };

  const renderProgress = async () => {
    let count = -1;
    while (count < +values.index) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      count++;
      setCount(count);
    }
  };

  const addByIndex = async () => {
    setAtIndex(true);
    setIsAddByIndex(true);
    renderProgress();
    const arr: string[] = [];
    await new Promise((resolve) =>
      setTimeout(resolve, (+values.index + 1) * 1000)
    );
    l.current?.addByIndex(values.value, +values.index);
    const list = l.current?.toArray();
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
      setIsAddByIndex(false);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setValues({ value: "", index: "" });
    setAtIndex(false);
    setCount(-1);
  };

  const deleteByIndex = async () => {
    setIsDeleteByIndex(true);
    renderProgress();
    const arr: string[] = [];
    await new Promise((resolve) =>
      setTimeout(resolve, (+values.index + 2) * 1000)
    );
    l.current?.deleteByIndex(+values.index);
    const list = l.current?.toArray();
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
    }
    setValues({ value: "", index: "" });
    setIsDeleteByIndex(false);
    setCount(-1);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          maxLength={4}
          isLimitText={true}
          onChange={handleChange}
          name="value"
          value={values.value}
          type="text"
          style={{ width: "204px" }}
          ending={"a"}
          disabled={headToDelete || atIndex || tailToDelete || isChangingHead || isChangingTail || isDeleteByIndex ? true : false}
        />
        <Button
          text="Добавить в head"
          onClick={prepend}
          style={{ minWidth: "0", width: "20%" }}
          disabled={values.value === "" || isChangingTail || atIndex ? true : false}
          isLoader={isChangingHead && !headToDelete ? true : false}
        />
        <Button
          text="Добавить в tail"
          onClick={append}
          style={{ minWidth: "0", width: "20%" }}
          disabled={values.value === "" || isChangingHead || atIndex ? true : false}
          isLoader={isChangingTail && !tailToDelete ? true : false}
        />
        <Button
          text="Удалить из head"
          onClick={deleteHead}
          style={{ minWidth: "0", width: "20%" }}
          disabled={isChangingTail || isChangingHead || atIndex || isDeleteByIndex || size === 0 ? true : false}
          isLoader={headToDelete ? true : false}
        />
        <Button
          text="Удалить из tail"
          onClick={deleteTail}
          style={{ minWidth: "0", width: "20%" }}
          disabled={isChangingTail || isChangingHead || atIndex || isDeleteByIndex || size === 0 ? true : false}
          isLoader={tailToDelete ? true : false}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            min={0}
            max={size}
            maxLength={2}
            onChange={handleChange}
            name="index"
            value={values.index}
            type="number"
            style={{ width: "204px" }}
            placeholder={'Введите число'}
            disabled={headToDelete || atIndex || tailToDelete || isChangingHead || isChangingTail || isDeleteByIndex ? true : false}
          />
          {size && values.index && +values.index >= size && <span className={styles.error}>Индекс должен быть меньше {size}</span>}
        </div>
        <Button
          text="Добавить по индексу"
          onClick={addByIndex}
          style={{ minWidth: "0", width: "40%" }}
          disabled={values.index === "" || values.value === "" || +values.index >= size ? true : false}
          isLoader={atIndex ? true : false}
        />
        <Button
          text="Удалить по индексу"
          onClick={deleteByIndex}
          style={{ minWidth: "0", width: "40%" }}
          disabled={values.index === "" || atIndex || +values.index >= size ? true : false}
          isLoader={isDeleteByIndex ? true : false}
        />
      </div>
      <div className={styles.list}>
        {list.map((el, i) => {
          if (atIndex) {
            return (
              <div className={styles.items} key={i}>
                <Circle
                  letter={el}
                  index={i}
                  tail={i === list.length - 1 ? "tail" : null}
                  head={
                    isAddByIndex && i === count + 1 ? (
                      <Circle
                        isSmall={true}
                        letter={values.value}
                        state={ElementStates.Changing}
                      />
                    ) : i === 0 ? (
                      "head"
                    ) : null
                  }
                  state={
                    i === count && !isAddByIndex
                      ? ElementStates.Modified
                      : i < count && !isAddByIndex
                        ? ElementStates.Changing
                        : i === count
                          ? ElementStates.Changing
                          : i < count
                            ? ElementStates.Changing
                            : ElementStates.Default
                  }
                />
                {list.length > 1 && i !== list.length - 1 && <ArrowIcon />}
              </div>
            );
          }
          if (isDeleteByIndex) {
            return (
              <div className={styles.items} key={i}>
                <Circle
                  letter={i === +values.index && count === i ? undefined : el}
                  index={i}
                  tail={
                    i === +values.index && count === i ? (
                      <Circle
                        isSmall={true}
                        letter={el}
                        state={ElementStates.Changing}
                      />
                    ) : i === list.length - 1 ? (
                      "tail"
                    ) : null
                  }
                  head={i === 0 ? "head" : null}
                  state={
                    i < count + 1
                      ? ElementStates.Changing
                      : ElementStates.Default
                  }
                />
                {list.length > 1 && i !== list.length - 1 && <ArrowIcon />}
              </div>
            );
          }
          if (i === 0 && list.length > 1) {
            return (
              <div className={styles.items} key={i}>
                <Circle
                  letter={headToDelete ? undefined : el}
                  index={i}
                  head={
                    isChangingHead ? (
                      <Circle
                        isSmall={true}
                        letter={headToDelete ? el : values.value}
                        state={ElementStates.Changing}
                      />
                    ) : (
                      "head"
                    )
                  }
                  state={colorHead}
                />
                {list.length > 1 && <ArrowIcon />}
              </div>
            );
          }
          if (i === list.length - 1 && list.length > 1) {
            return (
              <div className={styles.items} key={i}>
                <Circle
                  letter={tailToDelete ? undefined : el}
                  index={i}
                  tail={
                    isChangingTail ? (
                      <Circle
                        isSmall={true}
                        letter={tailToDelete ? el : values.value}
                        state={ElementStates.Changing}
                      />
                    ) : (
                      "tail"
                    )
                  }
                  state={colorTail}
                />
              </div>
            );
          }
          if (list.length === 1) {
            return (
              <div className={styles.items} key={i}>
                <Circle
                  letter={tailToDelete ? undefined : el}
                  index={i}
                  head={
                    isChangingHead ? (
                      <Circle
                        isSmall={true}
                        letter={headToDelete ? el : values.value}
                        state={ElementStates.Changing}
                      />
                    ) : (
                      "head"
                    )
                  }
                  tail={
                    isChangingTail ? (
                      <Circle
                        isSmall={true}
                        letter={tailToDelete ? el : values.value}
                        state={ElementStates.Changing}
                      />
                    ) : (
                      "tail"
                    )
                  }
                />
              </div>
            );
          } else
            return (
              <div className={styles.items} key={i}>
                <Circle letter={el} index={i} />
                <ArrowIcon />
              </div>
            );
        })}
      </div>
    </SolutionLayout>
  );
};
