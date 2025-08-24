"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

const Column3Grid = ({
  maximizeCard = {
    heading: "Discover New Books",
    description:
      "Find your next favorite read. Explore curated recommendations tailored to your taste.",
    illustration: "https://cdn-icons-png.flaticon.com/512/10221/10221907.png",
  },
  manageCard = {
    heading: "Manage Library",
    description:
      "Organize your reading list, track progress, & set reading goals.",
    icon: "https://cdn-icons-png.flaticon.com/512/1048/1048927.png",
  },
  setGoalsCard = {
    heading: "Reading Goals",
    description:
      "Set annual reading targets or challenge yourself with new genres.",
  },
  loungesCard = {
    heading: "Book Clubs",
    description:
      "Join reading communities & discover books through discussions.",
  },
  strategyCard = {
    heading: "Reading Strategy",
    description:
      "Personalized reading plan that fits your schedule and interests.",
    illustration: "https://cdn-icons-png.flaticon.com/512/7011/7011353.png",
  },
  findCompareCard = {
    heading: "Find, Compare & Read",
    description:
      "Discover great books. Compare reviews and start reading instantly.",
    illustration: "https://cdn-icons-png.flaticon.com/512/10680/10680571.png",
  },
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <div className="flex gap-6">

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="flex-1 bg-violet-300 rounded-3xl p-8 shadow-lg flex flex-col justify-between min-h-[350px]">
            <h2 className="text-6xl font-bold text-gray-900">
              {maximizeCard.heading}
            </h2>
            {maximizeCard.illustration && (
              <div className="flex justify-center items-center my-4">
                <Image
                  src={maximizeCard.illustration}
                  alt=""
                  width={144}
                  height={144}
                />
              </div>
            )}
            <p className="text-gray-700 text-sm mt-2">
              {maximizeCard.description}
            </p>
          </motion.div>

          <div className="flex flex-col gap-6 w-[35%] min-w-[350px]">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-pink-200 rounded-3xl p-6 shadow-lg flex items-center justify-between min-h-[150px]">
              <div className="flex-1">
                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                  {manageCard.heading}
                </h3>
                <p className="text-sm text-gray-700">
                  {manageCard.description}
                </p>
              </div>
              {manageCard.icon && (
                <div className="ml-4">
                  <Image
                    src={manageCard.icon}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </motion.div>
            <div className="flex gap-4">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-yellow-200 rounded-2xl p-4 shadow flex flex-col justify-between min-h-[170px] flex-1">
                <h4 className="font-bold text-lg text-gray-900">
                  {setGoalsCard.heading}
                </h4>
                <p className="text-sm text-gray-700">
                  {setGoalsCard.description}
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-green-200 rounded-2xl p-4 shadow flex flex-col justify-between min-h-[170px] flex-1">
                <h4 className="font-bold text-lg text-gray-900">
                  {loungesCard.heading}
                </h4>
                <p className="text-sm text-gray-700">
                  {loungesCard.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-6">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-orange-200 rounded-3xl p-8 shadow-lg flex items-center min-h-[150px] flex-2">
            {strategyCard.illustration && (
              <div className="w-24 h-20 mr-6 flex items-center justify-center">
                <Image
                  src={strategyCard.illustration}
                  alt=""
                  width={100}
                  height={80}
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {strategyCard.heading}
              </h3>
              <p className="text-sm text-gray-700">
                {strategyCard.description}
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-blue-200 rounded-3xl p-8 shadow-lg flex items-center min-h-[150px] flex-1">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {findCompareCard.heading}
              </h3>
              <p className="text-sm text-gray-700">
                {findCompareCard.description}
              </p>
            </div>
            {findCompareCard.illustration && (
              <div className="w-20 h-16 ml-6 flex items-center justify-center">
                <Image
                  src={findCompareCard.illustration}
                  alt=""
                  width={80}
                  height={64}
                />
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Column3Grid;
