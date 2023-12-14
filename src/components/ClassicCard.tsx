//@ts-nocheck
"use client";

import { useState, useEffect } from "react";
import {
  MagnifyingGlassPlusIcon,
  ChevronDownIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const LOTTERY_API_URL =
  "https://testing-luckito-backend.rnssol.com/api/luckito/lottery/get-lottery?lotteryType=CLASSIC";

export default function ClassicCard() {
  const [lotteryData, setLotteryData] = useState(null);
  const [nextDrawTime, setNextDrawTime] = useState("");

  useEffect(() => {
    const fetchLotteryData = async () => {
      try {
        const response = await fetch(LOTTERY_API_URL);
        const data = await response.json();
        if (data.result) {
          console.log(data.result);
          setLotteryData(data.data);
          startCountdown(data.data.nextDraw);
        }
      } catch (error) {
        console.error("Error fetching CLASSIC lottery data:", error);
      }
    };

    fetchLotteryData();
  }, []);

  const startCountdown = (duration) => {
    const countdown = () => {
      const hours = Math.floor(duration / 3600);
      duration -= hours * 3600;
      const minutes = Math.floor(duration / 60);
      duration -= minutes * 60;
      const seconds = duration;

      setNextDrawTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
      if (duration <= 0) {
        clearInterval(timerId);
      }
      duration--;
    };
    let timerId = setInterval(countdown, 1000);
  };

  if (!lotteryData) {
    return <div>Loading...</div>;
  }

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <div className="w-full bg-blue-100 rounded-lg">
        <div className="collapse-title text-xl font-medium space-y-8 px-0">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <h2 className="font-extrabold text-2xl text-blue-600">
                {lotteryData.lotteryName}
              </h2>
              <div className="font-light text-blue-500">Past 5 Results</div>
            </div>
            <div>
              <MagnifyingGlassPlusIcon className="h-6 w-6 text-blue-500 font-semibold" />
            </div>
          </div>
          {
            //api not returning previous 5 results
          }
          <div className="space-x-2 px-4 flex justify-start">No Data Found</div>

          <div className="flex items-center justify-between bg-blue-600 px-4 text-md text-white">
            <div className="flex items-center space-x-2">
              <h5>Next Draw</h5>
              <ClockIcon />
              <span>{nextDrawTime}</span>
            </div>
            <button className="btn btn-sm px-4 text-blue-500">Play</button>
          </div>

          <div className="collapse">
            <input type="checkbox" checked={lotteryData.showPoolDetail} />
            <div className="collapse-title text-xl font-medium flex items-center justify-center space-x-2">
              <ChevronDownIcon className="h-4 w-4" />{" "}
              <span>Current Pool Status</span>
            </div>
            <div className="collapse-content">
              {lotteryData.poolAmount?.map((item, index) => (
                <div
                  className="flex items-center justify-between mb-4"
                  key={index}
                >
                  <span>{formatNumber(parseFloat(item.poolAmount))}</span>
                  <span>{item.coinSymbol}</span>
                </div>
              ))}
              <div className="divider"></div>
              <div className="flex justify-end">
                <div>≈ {formatNumber(lotteryData.currentPool)} LUCKI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
