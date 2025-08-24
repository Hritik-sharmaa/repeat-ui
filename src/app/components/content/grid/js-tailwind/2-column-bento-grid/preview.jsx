"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

const Column2Grid = ({
  mainCard = {},
  contactCard = {},
  logoCard = {},
  mapCard = {},
  detailsCard = {},
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}>
        <div className="grid grid-cols-12 grid-rows-8 gap-4 max-h-[1000px]">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="col-span-7 row-span-5 bg-white rounded-3xl p-8 shadow-lg overflow-hidden relative">
            <div className="flex justify-between items-start mb-8">
              <div className="text-sm text-gray-500 uppercase tracking-wide">
                {mainCard.description}
                <br />
                The North Remembers
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full mx-1"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </button>
            </div>

            <h1 className="text-6xl font-bold text-gray-900 mb-8 leading-tight">
              {mainCard.title}
            </h1>
            <div className="flex flex-wrap gap-x-8 gap-y-6 mb-12">
              {mainCard.stats?.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 flex-1 min-w-[45%]">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-8 text-xs text-gray-400 tracking-wider">
              EST. 298 AC
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="col-span-5 row-span-5 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-3xl p-8 shadow-lg relative overflow-hidden">
            {contactCard.image && (
              <div className="absolute inset-0 opacity-20">
                <Image
                  src={contactCard.image}
                  alt="Medieval Sword"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="absolute top-6 right-6 bg-black text-white px-4 py-2 rounded-full text-sm z-10">
              {contactCard.description}
              <br />
              she has many faces:
            </div>

            <div className="mt-20 relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {contactCard.contact?.name}
              </h2>
              <div className="text-lg text-gray-600 mb-1">
                {contactCard.contact?.position}
              </div>
              <div className="text-purple-600 mb-8">
                {contactCard.contact?.email}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-gray-500 flex items-center justify-center">
                    ⚔️
                  </div>
                  <span className="text-gray-700">
                    {contactCard.contact?.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-gray-500 flex items-center justify-center">
                    🎭
                  </div>
                  <span className="text-gray-700">
                    {contactCard.contact?.phone}
                  </span>
                </div>
              </div>

              <div className="mt-12">
                <div className="text-sm text-gray-500 mb-2">
                  {contactCard.about?.title}
                </div>
                <div className="text-6xl font-bold text-gray-900">
                  {contactCard.about?.year}
                </div>
                <div className="text-gray-600 mt-2 text-sm leading-relaxed">
                  {contactCard.about?.description}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="col-span-3 row-span-3 bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center justify-center">
            <div className="text-6xl mb-4">🐺</div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              {logoCard.title}
            </h1>
            <p className="text-sm text-gray-600 text-center">
              {logoCard.description}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="col-span-4 row-span-3 bg-white rounded-3xl shadow-lg overflow-hidden relative">
            <div className="w-full h-full relative">
              {mapCard.image && mapCard.title && (
                <Image
                  src={mapCard.image}
                  alt={mapCard.title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-bold text-xl mb-1">{mapCard.title}</h4>
                <p className="text-sm opacity-90">{mapCard.description}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="col-span-5 row-span-3 bg-gray-900 rounded-3xl p-8 shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-2">
                {detailsCard.title || "Bastard of Winterfell"}
              </h3>
              <div className="text-xl text-gray-300 mb-8">
                {detailsCard.description || "King in the North"}
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#f3f4f6",
                  color: "#1f2937",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-200 text-gray-900 px-8 py-4 rounded-2xl font-semibold transition-all duration-200">
                Bend the Knee
              </motion.button>
            </div>

            {detailsCard.image && (
              <div className="absolute inset-0 opacity-20">
                <Image
                  src={detailsCard.image}
                  alt={detailsCard.title || "Details"}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-gray-800/50 to-transparent"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 border-4 border-gray-700 rounded-full"></div>
            <div className="absolute -bottom-5 -right-5 w-24 h-24 border-2 border-gray-700 rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Column2Grid;
