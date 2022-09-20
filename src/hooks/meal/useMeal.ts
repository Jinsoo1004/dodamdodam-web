import { useCallback, useEffect, useState } from "react";
import dateTransform from "../../util/transform/dateTransform";
import dayjs from "dayjs";
import { Meal } from "../../types/meal/meal.type";
import mealRepository from "../../repository/meal/meal.repository";

const useMeal = () => {
  const [date, setDate] = useState<string>(dateTransform.hyphen());
  const [meal, setMeal] = useState<Meal>();
  const [validMeal, setValidMeal] = useState<Meal>();
  const [tempMonth, setTempMonth] = useState<string>(
    dateTransform.hyphen().split("-")[1]
  );

  //   const mealsData = useGetMeals({
  //     year: dateTransform.hyphen().split("-")[0],
  //     month: tempMonth,
  //   }).data?.data.meal;

  // useEffect(() => {
  //   setValidMeal(meals[Number(date.split("-")[2]) - 1]);
  // }, [date, meals]);

  //날짜를 바꾸다가 월이 달라졌을때를 확인하는 부분

  const requestMeals = useCallback(async () => {
    try {
      const dates = date.split("-");

      const { data } = await mealRepository.getMeal({
        year: dates[0],
        month: dates[1],
        day: dates[2],
      });

      setMeal(data);
    } catch (error) {}
  }, [date]);

  //월이 달라졌을 때 바뀐 월에 맞게 리퀘스트 하는 부분
  useEffect(() => {
    requestMeals();
  }, [requestMeals]);

  const handleMealDate = (e: Date) => {
    setDate(dayjs(e).format("YYYY-MM-DD"));
  };

  const prevMealDate = () => {
    setDate((prev) => dayjs(prev).subtract(1, "day").format("YYYY-MM-DD"));
  };

  const nextMealDate = () => {
    setDate((prev) => dayjs(prev).add(1, "day").format("YYYY-MM-DD"));
  };

  return {
    date,
    meal,
    handleMealDate,
    prevMealDate,
    nextMealDate,
  };
};

export default useMeal;