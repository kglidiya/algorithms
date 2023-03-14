import React, { FormEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./Fibonacci.module.css";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<number | string>(1);
  const [arr, setArr] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  const getFibonacciNumbers = async (value: number) => {
    setIsLoading(true)
    setIsStarted(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setArr([1]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setArr([1, 1]);
    let fib: number[] = [1, 1];
    for (let i = 2; i < value + 1; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      fib[i] = fib[i - 2] + fib[i - 1];
      setArr((arr) => [...arr, fib[i]]);
    }
    setIsLoading(false)
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input
          min={1}
          max={19}
          type={"number"}
          onChange={handleChange}
          isLimitText={true}
          disabled={isLoading ? true : false}
        />
        <Button
          isLoader={isLoading ? true : false}
          disabled={value <= 0 || value > 19 || value === 1 ? true : false}
          text="Рассчитать"
          onClick={() => {
            getFibonacciNumbers(+value);
          }}
          style={{ minWidth: "178px" }}
          id="calculate"
        />
      </div>
      <div className={styles.digits}>
        {isStarted &&
          arr.map((el, i) => {
            return <Circle key={i} letter={String(el)} tail={String(i)} />;
          })}
      </div>
    </SolutionLayout>
  );
};
