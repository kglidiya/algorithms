import React, {
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./Sorting.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { randomArr } from "../../utils/randomArr";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [array, setArr] = useState<number[]|[]>([]);
  const [sortingType, setSortingType] = useState("selection");
  const [sorted, setSorted] = useState(false);
  const [direction, setDirection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modifiedRight, setModifiedRight] = useState(-2);
  const [modifiedLeft, setModifiedLeft] = useState(-2);
  const [elSorted, setElSorted] = useState(18);
  const [btnAscendDisabled, setBtnAscendDisabled] = useState(false);
  const [btnDescendDisabled, setBtnDescenDisabled] = useState(false);
  const generateArr = () => {
    setSorted(false);
    setModifiedLeft(-2);
    setModifiedRight(-2);
    setElSorted(18);
    const array = randomArr(3, 17);
    setArr(array);
  };
  useEffect(() => {
    generateArr();
  }, []);
  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setSortingType(target.value);
  };
  const selectionSort = async (arr: number[], direction: string) => {
    setIsLoading(true);
    setDirection(direction);
    setSorted(false);
    const { length } = arr;
    let min: number;
    for (let i = 0; i < length; i++) {
      min = i;
      for (let j = i; j < length; j++) {
        if (direction === "Ascending" ? arr[min] > arr[j] : arr[min] < arr[j]) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          [arr[j], arr[min]] = [arr[min], arr[j]];
          const arrSorted = [...arr];
          setArr(arrSorted);
          setModifiedLeft(j);
          setModifiedRight(min);
        }
      }
    }
    setSorted(true);
    setIsLoading(false);
    setBtnAscendDisabled(false);
    setBtnDescenDisabled(false);
  };
  const bubbleSort = async (arr: number[], direction: string) => {
    setIsLoading(true);
    setDirection(direction);
    setSorted(false);
    const { length } = arr;
    let elSorted = length;
    for (let i = 0; i < length; i++) {
      elSorted--;
      for (let j = 0; j < length - 1 - i; j++) {
        if (
          direction === "Ascending" ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1]
        ) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          const arrSorted = [...arr];
          setArr(arrSorted);
          setElSorted(elSorted);
          setModifiedLeft(j);
          setModifiedRight(j + 1);
        }
      }
    }
    setSorted(true);
    setIsLoading(false);
    setBtnAscendDisabled(false);
    setBtnDescenDisabled(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <RadioInput
          label="Выбор"
          name="type"
          value="selection"
          onChange={handleChange}
          checked={sortingType === "selection"}
        />
        <RadioInput
          label="Пузырёк"
          name="type"
          value="bubble"
          onChange={handleChange}
          checked={sortingType === "bubble"}
        />
        <Button
          disabled={btnAscendDisabled}
          isLoader={isLoading && direction === "Ascending" ? true : false}
          text="По возрастанию"
          sorting={Direction.Ascending}
          style={{ minWidth: "205px" }}
          onClick={() => {
            setBtnDescenDisabled(true);
            if (sortingType === "selection") {
              selectionSort(array, "Ascending");
            } else bubbleSort(array, "Ascending");
          }}
        />
        <Button
          disabled={btnDescendDisabled}
          isLoader={isLoading && direction === "Descending" ? true : false}
          text="По убыванию"
          sorting={Direction.Descending}
          style={{ minWidth: "205px", marginRight: "60px" }}
          onClick={() => {
            setBtnAscendDisabled(true);
            if (sortingType === "selection") {
              selectionSort(array, "Descending");
            } else bubbleSort(array, "Descending");
          }}
        />
        <Button
          disabled={isLoading ? true : false}
          onClick={generateArr}
          text="Новый массив"
          style={{ minWidth: "168px" }}
        />
      </div>
      <div className={styles.columns}>
        {sorted &&
          array.map((el, i) => {
            return <Column key={i} index={el} state={ElementStates.Modified} />;
          })}
        {!sorted &&
          array.map((el, i) => {
            if (i === modifiedRight || i === modifiedLeft) {
              return (
                <Column key={i} index={el} state={ElementStates.Changing} />
              );
            }
            if (sortingType === "bubble" && i > elSorted) {
              return (
                <Column key={i} index={el} state={ElementStates.Modified} />
              );
            }
            if (sortingType === "selection" && i < modifiedRight) {
              return (
                <Column key={i} index={el} state={ElementStates.Modified} />
              );
            } else
              return (
                <Column key={i} index={el} state={ElementStates.Default} />
              );
          })}
      </div>
    </SolutionLayout>
  );
};
