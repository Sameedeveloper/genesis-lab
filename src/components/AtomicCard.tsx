//@ts-nocheck
"use client";
import { useState, useEffect } from "react";
import {
  MagnifyingGlassPlusIcon,
  ClockIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const CLASSIC_LOTTERY_API_URL =
  "https://testing-luckito-backend.rnssol.com/api/luckito/lottery/get-lottery?lotteryType=ATOMIC";

export default function AtomicCard() {
  const [classicData, setClassicData] = useState(null);
  const [nextDrawTime, setNextDrawTime] = useState("");

  useEffect(() => {
    const fetchClassicData = async () => {
      try {
        const response = await fetch(CLASSIC_LOTTERY_API_URL);
        const data = await response.json();
        if (data.result) {
          setClassicData(data.data);
        }
      } catch (error) {
        console.error("Error fetching Classic lottery data:", error);
      }
    };

    fetchClassicData();
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      let remainingTime = classicData?.nextDraw || 0;
      const hours = Math.floor(remainingTime / 3600);
      remainingTime %= 3600;
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      setNextDrawTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [classicData]);

  if (!classicData) {
    return <div>Loading...</div>;
  }


  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="w-full bg-green-100 rounded-lg">
      <div className="collapse-title text-xl font-medium space-y-8 px-0">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <h2 className="font-extrabold text-2xl text-green-600">
              {classicData.lotteryName}
            </h2>
            <div className="font-light text-green-500">
              No. {classicData.roundNumber}
            </div>
          </div>
          <div>
            <MagnifyingGlassPlusIcon className="h-6 w-6 text-green-500 font-semibold" />
          </div>
        </div>
        <div className="space-x-2 px-4 flex justify-start">
          {classicData.previousWinningticket.map((item, index) => (
            <span key={index} className="p-2 px-4 rounded-full bg-green-600">
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 text-sm">
          <label>Winning Pot</label>
          <span className="space-x-2">
            <span className="text-2xl font-bold">
              {formatNumber(classicData.winningPot)}
            </span>
            <span>LUCKI</span>
          </span>
        </div>
        <div className="flex items-center justify-between bg-green-600 px-4 text-md text-white">
          <div className="flex items-center space-x-2">
            <h5>Next Draw</h5>
            <ClockIcon />
            <span>{nextDrawTime}</span>
          </div>
          <button className="btn btn-sm px-4 text-green-500">Play</button>
        </div>

        <div className="collapse">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium flex items-center justify-center space-x-2">
            <ChevronDownIcon className="h-4 w-4" />{" "}
            <span>Current Pool Status</span>
          </div>
          <div className="collapse-content">
            {classicData.poolAmount?.map((item, index) => (
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
              <div>≈ {formatNumber(classicData.currentPool)} LUCKI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
