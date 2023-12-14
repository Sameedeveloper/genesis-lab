//@ts-nocheck
"use client";

import { useState, useEffect } from "react";
import {
  MagnifyingGlassPlusIcon,
  ChevronDownIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const LOTTERY_API_URL =
  "https://testing-luckito-backend.rnssol.com/api/luckito/lottery/get-lottery?lotteryType=COSMIC";

export default function CosmicCard() {
  const [lotteryData, setLotteryData] = useState(null);
  const [nextCosmicDraw, setNextCosmicDraw] = useState("");
  const router = useRouter("");

  useEffect(() => {
    const fetchLotteryData = async () => {
      try {
        const response = await fetch(LOTTERY_API_URL);
        const data = await response.json();
        if (data.result) {
          setLotteryData(data.data);
        }
      } catch (error) {
        console.error("Error fetching lottery data:", error);
      }
    };

    fetchLotteryData();
  }, []);

  useEffect(() => {
    console.log(lotteryData);
    const drawDate = new Date("dec 31, 2023 15:37:25"); // Replace this with the actual draw date from the API
    const interval = setInterval(() => {
      const timeDifference = drawDate.getTime() - new Date().getTime();
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      setNextCosmicDraw(
        `${hours - 10 > 9 ? hours : "0" + hours}:${
          minutes - 10 > 9 ? minutes : "0" + minutes
        }:${seconds - 10 > 9 ? seconds : "0" + seconds}`,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!lotteryData) {
    return <div>Loading...</div>;
  }

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <h1 className="font-bold mb-2">Latest Results</h1>
      <div className="w-full bg-purple-100 rounded-lg">
        <div className="collapse-title text-xl font-medium space-y-8 px-0">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <h2 className="font-extrabold text-2xl text-purple-600">
                {lotteryData.lotteryName}
              </h2>
              <div className="font-light text-purple-500">
                No. {lotteryData.roundNumber}
              </div>
            </div>
            <div>
              <MagnifyingGlassPlusIcon className="h-6 w-6 text-purple-500 font-semibold" />
            </div>
          </div>
          <div className="space-x-2 px-4 flex justify-start">
            {lotteryData.previousWinningticket.map((item, index) => (
              <span key={index} className="p-2 px-4 rounded-full bg-purple-600">
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between px-4 text-sm">
            <label>Winning Pot</label>
            <span className="space-x-2">
              <span className="text-2xl font-bold">
                {formatNumber(lotteryData.winningPot)}
              </span>
              <span>LUCKI</span>
            </span>
          </div>
          <div className="flex items-center justify-between bg-purple-600 px-4 text-md text-white">
            <div className="flex items-center space-x-2">
              <h5>Next Draw</h5>
              <ClockIcon />
              <span>{nextCosmicDraw && nextCosmicDraw}</span>
            </div>
            <button
              className="btn btn-sm px-4 text-purple-500"
              onClick={() => {
                //fetch session later
                //if session exits do nothing else router.push('/signIn)
              }}
            >
              Play
            </button>
          </div>

          <div className="collapse">
            <input type="checkbox" />
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
