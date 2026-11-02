"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import "./style.css";

interface GridItemData {
  title?: string;
  description?: string;
  image?: string;
  stats?: Array<{ label: string; value: string }>;
  contact?: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  about?: {
    title: string;
    year: string;
    description: string;
  };
}

interface BentoGridProps {
  gap?: number;
  radius?: number;
  hoverScale?: number;
  mainCard?: GridItemData;
  contactCard?: GridItemData;
  logoCard?: GridItemData;
  mapCard?: GridItemData;
  detailsCard?: GridItemData;
}

const Column2Grid = ({
  mainCard = {},
  contactCard = {},
  logoCard = {},
  mapCard = {},
  detailsCard = {},
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
    <div className="rui-b2-bento-container" style={vars}>
      <motion.div
        className="rui-b2-bento-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <div className="rui-b2-bento-grid">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: hoverScale }}
            className="rui-b2-card-main"
          >
            <div className="rui-b2-card-main-header">
              <div className="rui-b2-card-main-desc">
                {mainCard.description}
                <br />
                The North Remembers
              </div>
              <button type="button" aria-label="More" className="rui-b2-more">
                <span />
                <span />
                <span />
              </button>
            </div>

            <h1 className="rui-b2-card-main-title">{mainCard.title}</h1>
            <div className="rui-b2-card-main-stats">
              {mainCard.stats?.map((stat, index) => (
                <div key={index} className="rui-b2-card-main-stat">
                  <div className="rui-b2-card-main-stat-label">
                    {stat.label}
                  </div>
                  <div className="rui-b2-card-main-stat-value">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="rui-b2-card-main-est">EST. 298 AC</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: hoverScale }}
            className="rui-b2-card-contact"
          >
            {contactCard.image && (
              <div className="rui-b2-card-contact-image">
                <img
                  src={contactCard.image}
                  alt="Medieval Sword"
                  className="rui-b2-cover"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            )}

            <div className="rui-b2-card-contact-desc">
              {contactCard.description}
              <br />
              she has many faces:
            </div>

            <div className="rui-b2-card-contact-content">
              <h2 className="rui-b2-card-contact-name">
                {contactCard.contact?.name}
              </h2>
              <div className="rui-b2-card-contact-position">
                {contactCard.contact?.position}
              </div>
              <div className="rui-b2-card-contact-email">
                {contactCard.contact?.email}
              </div>

              <div className="rui-b2-card-contact-info">
                <div className="rui-b2-card-contact-info-row">
                  <div className="rui-b2-card-contact-info-icon">⚔️</div>
                  <span className="rui-b2-card-contact-info-text">
                    {contactCard.contact?.email}
                  </span>
                </div>
                <div className="rui-b2-card-contact-info-row">
                  <div className="rui-b2-card-contact-info-icon">🎭</div>
                  <span className="rui-b2-card-contact-info-text">
                    {contactCard.contact?.phone}
                  </span>
                </div>
              </div>

              <div className="rui-b2-card-contact-about">
                <div className="rui-b2-card-contact-about-title">
                  {contactCard.about?.title}
                </div>
                <div className="rui-b2-card-contact-about-year">
                  {contactCard.about?.year}
                </div>
                <div className="rui-b2-card-contact-about-desc">
                  {contactCard.about?.description}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: hoverScale + 0.03, rotate: 1 }}
            className="rui-b2-card-logo"
          >
            <div className="rui-b2-card-logo-icon">🐺</div>
            <h1 className="rui-b2-card-logo-title">{logoCard.title}</h1>
            <p className="rui-b2-card-logo-desc">{logoCard.description}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: hoverScale }}
            className="rui-b2-card-map"
          >
            <div className="rui-b2-card-map-image">
              {mapCard.image && mapCard.title && (
                <img
                  src={mapCard.image}
                  alt={mapCard.title}
                  className="rui-b2-cover"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
              <div className="rui-b2-card-map-gradient"></div>
              <div className="rui-b2-card-map-content">
                <h4 className="rui-b2-card-map-title">{mapCard.title}</h4>
                <p className="rui-b2-card-map-desc">{mapCard.description}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: hoverScale }}
            className="rui-b2-card-details"
          >
            <div className="rui-b2-card-details-content">
              <h3 className="rui-b2-card-details-title">
                {detailsCard.title || "Bastard of Winterfell"}
              </h3>
              <div className="rui-b2-card-details-desc">
                {detailsCard.description || "King in the North"}
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#f3f4f6",
                  color: "#1f2937",
                }}
                whileTap={{ scale: 0.95 }}
                className="rui-b2-card-details-btn"
              >
                Bend the Knee
              </motion.button>
            </div>

            {detailsCard.image && (
              <div className="rui-b2-card-details-image">
                <img
                  src={detailsCard.image}
                  alt={detailsCard.title || "Details"}
                  className="rui-b2-cover"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            )}

            <div className="rui-b2-card-details-gradient"></div>
            <div className="rui-b2-card-details-circle1"></div>
            <div className="rui-b2-card-details-circle2"></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Column2Grid;
