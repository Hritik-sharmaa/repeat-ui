"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import "./style.css";

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
        className="bento-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <div className="bento-grid">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="maximize-card">
            <h2 className="maximize-card-title">
              {maximizeCard.heading}
            </h2>
            {maximizeCard.illustration && (
              <div className="maximize-card-illustration">
                <Image
                  src={maximizeCard.illustration}
                  alt=""
                  width={144}
                  height={144}
                />
              </div>
            )}
            <p className="maximize-card-description">{maximizeCard.description}</p>
          </motion.div>

          <div className="right-column">
            <div className="right-column-grid">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="manage-card">
                <div className="manage-card-content">
                  <h3 className="manage-card-title">
                    {manageCard.heading}
                  </h3>
                  <p className="manage-card-description">
                    {manageCard.description}
                  </p>
                </div>

                {manageCard.icon && (
                  <div className="manage-card-icon">
                    <Image
                      src={manageCard.icon}
                      alt=""
                      width={120}
                      height={120}
                    />
                  </div>
                )}
              </motion.div>

              <div className="small-cards-row">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="small-card small-card-yellow">
                  <div className="small-card-content">
                    <h4 className="small-card-title">
                      {setGoalsCard.heading}
                    </h4>
                    <p className="small-card-description">
                      {setGoalsCard.description}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="small-card small-card-green">
                  <div className="small-card-content">
                    <h4 className="small-card-title">
                      {loungesCard.heading}
                    </h4>
                    <p className="small-card-description">
                      {loungesCard.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="strategy-card">
            {strategyCard.illustration && (
              <div className="strategy-card-illustration">
                <Image
                  src={strategyCard.illustration}
                  alt=""
                  width={160}
                  height={112}
                />
              </div>
            )}

            <div className="strategy-card-content">
              <h3 className="strategy-card-title">
                {strategyCard.heading}
              </h3>
              <p className="strategy-card-description">
                {strategyCard.description}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="find-compare-card">
            <div className="find-compare-card-content">
              <h3 className="find-compare-card-title">
                {findCompareCard.heading}
              </h3>
              <p className="find-compare-card-description">
                {findCompareCard.description}
              </p>
            </div>

            {findCompareCard.illustration && (
              <div className="find-compare-card-illustration">
                <Image
                  src={findCompareCard.illustration}
                  alt=""
                  width={160}
                  height={112}
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
