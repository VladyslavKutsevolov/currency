import React, { useState, useEffect } from "react";

const date = new Date();
const now = date.toISOString().split("T")[0];
date.setDate(date.getDate() - 30);
const ago30 = date.toISOString().split("T")[0];

const url = `https://api.frankfurter.app/${ago30}..${now}?amount=100&from=CAD&to=USD`;

export const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(url);
      const { rates } = await res.json();

      let rateData = [];

      for (const key in rates) {
        const rate = {
          date: new Date(key),
          rate: rates[key].USD,
        };
        rateData = [...rateData, rate];
      }
      setData(rateData);
    };

    getData();
  }, []);

  return data;
};

export default useData;
