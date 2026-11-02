"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import "./style.css";

interface CardData {
  heading: string;
  description: string;
  illustration?: string;
  icon?: string;
  backgroundColor?: string;
}

interface BentoGridProps {
  gap?: number;
  radius?: number;
  hoverScale?: number;
  maximizeCard?: CardData;
  manageCard?: CardData;
  setGoalsCard?: CardData;
  loungesCard?: CardData;
  strategyCard?: CardData;
  findCompareCard?: CardData;
}

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
  gap = 16,
  radius = 24,
  hoverScale = 1.02,
}: BentoGridProps) => {
  // Layout knobs, read by the cards through CSS variables.
  const vars = {
    "--rui-gap": `${gap}px`,
    "--rui-radius": `${radius}px`,
  } as CSSProperties;
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
    <div style={vars}>
      <motion.div
        className="rui-b3-bento-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="rui-b3-bento-grid">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: hoverScale }}
            className="rui-b3-maximize-card"
          >
            <h2 className="rui-b3-maximize-card-title">
              {maximizeCard.heading}
            </h2>
            {maximizeCard.illustration && (
              <div className="rui-b3-maximize-card-illustration">
                <img
                  src={maximizeCard.illustration}
                  alt=""
                  width={144}
                  height={144}
                />
              </div>
            )}
            <p className="rui-b3-maximize-card-description">
              {maximizeCard.description}
            </p>
          </motion.div>

          <div className="rui-b3-right-column">
            <div className="rui-b3-right-column-grid">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: hoverScale }}
                className="rui-b3-manage-card"
              >
                <div className="rui-b3-manage-card-content">
                  <h3 className="rui-b3-manage-card-title">
                    {manageCard.heading}
                  </h3>
                  <p className="rui-b3-manage-card-description">
                    {manageCard.description}
                  </p>
                </div>

                {manageCard.icon && (
                  <div className="rui-b3-manage-card-icon">
                    <img
                      src={manageCard.icon}
                      alt=""
                      width={120}
                      height={120}
                    />
                  </div>
                )}
              </motion.div>

              <div className="rui-b3-small-cards-row">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: hoverScale }}
                  className="rui-b3-small-card rui-b3-small-card-yellow"
                >
                  <div className="rui-b3-small-card-content">
                    <h4 className="rui-b3-small-card-title">
                      {setGoalsCard.heading}
                    </h4>
                    <p className="rui-b3-small-card-description">
                      {setGoalsCard.description}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: hoverScale }}
                  className="rui-b3-small-card rui-b3-small-card-green"
                >
                  <div className="rui-b3-small-card-content">
                    <h4 className="rui-b3-small-card-title">
                      {loungesCard.heading}
                    </h4>
                    <p className="rui-b3-small-card-description">
                      {loungesCard.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: hoverScale }}
            className="rui-b3-strategy-card"
          >
            {strategyCard.illustration && (
              <div className="rui-b3-strategy-card-illustration">
                <img
                  src={strategyCard.illustration}
                  alt=""
                  width={160}
                  height={112}
                />
              </div>
            )}

            <div className="rui-b3-strategy-card-content">
              <h3 className="rui-b3-strategy-card-title">
                {strategyCard.heading}
              </h3>
              <p className="rui-b3-strategy-card-description">
                {strategyCard.description}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: hoverScale }}
            className="rui-b3-find-compare-card"
          >
            <div className="rui-b3-find-compare-card-content">
              <h3 className="rui-b3-find-compare-card-title">
                {findCompareCard.heading}
              </h3>
              <p className="rui-b3-find-compare-card-description">
                {findCompareCard.description}
              </p>
            </div>

            {findCompareCard.illustration && (
              <div className="rui-b3-find-compare-card-illustration">
                <img
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
