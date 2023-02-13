import React, { FormEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./String.module.css";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState<string[]>([]);
  const [sorted, setSorted] = useState(false);
  const [startIndex, setStartIndex] = useState(-1);
  const [endIndex, setEndIndex] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  const reverse = async (value: string) => {
    setIsLoading(true);
    setSorted(false);
    setStartIndex(-1);
    setEndIndex(12);
    const res = value.split("");
    setArr(res);
    let start = 0;
    let end: number;
    value.length % 2 === 0 ? (end = res.length) : (end = res.length - 1);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStartIndex(start);
    value.length % 2 === 0 ? setEndIndex(end - 1) : setEndIndex(end);

    while (start <= end) {
      setArr(res);
      setStartIndex(start);
      value.length % 2 === 0 ? setEndIndex(end - 1) : setEndIndex(end);
      await new Promise((resolve) => setTimeout(resolve, 500));
      value.length % 2 === 0
        ? ([res[start], res[end - 1]] = [res[end - 1], res[start]])
        : ([res[start], res[end]] = [res[end], res[start]]);
      start++;
      end--;
     setValue(res.join(""));
    }
    setSorted(true);
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input maxLength={11} isLimitText={true} onChange={handleChange} ending={"ов"}/>
        <Button
          isLoader={isLoading ? true : false}
          text="Развернуть"
          onClick={() => {
            reverse(value);
          }}
          style={{minWidth: '178px'}}
        />
      </div>
      <div className={styles.letters}>
        {sorted &&
          arr.map((letter, i) => {
            return (
              <Circle key={i} letter={letter} state={ElementStates.Modified} />
            );
          })}
        {!sorted &&
          arr.map((letter, i) => {
            if (i === startIndex || i === endIndex) {
              return (
                <Circle
                  key={i}
                  letter={letter}
                  state={ElementStates.Changing}
                />
              );
            }
            if (i < startIndex || i > endIndex) {
              return (
                <Circle
                  key={i}
                  letter={letter}
                  state={ElementStates.Modified}
                />
              );
            } else if (i > startIndex || i < endIndex) {
              return (
                <Circle key={i} letter={letter} state={ElementStates.Default} />
              );
            }
          })}
      </div>
    </SolutionLayout>
  );
};
