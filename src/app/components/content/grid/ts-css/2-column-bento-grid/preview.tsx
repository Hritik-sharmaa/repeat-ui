"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
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
}: BentoGridProps) => {
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
    <div className="container">
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}>
        <div className="grid">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="card-main">
            <div className="card-main-header">
              <div className="card-main-desc">
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

            <h1 className="card-main-title">{mainCard.title}</h1>
            <div className="card-main-stats">
              {mainCard.stats?.map((stat, index) => (
                <div key={index} className="card-main-stat">
                  <div className="card-main-stat-label">{stat.label}</div>
                  <div className="card-main-stat-value">{stat.value}</div>
                </div>
              ))}
            </div>
            <div className="card-main-est">EST. 298 AC</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="card-contact">
            {contactCard.image && (
              <div className="card-contact-image">
                <Image
                  src={contactCard.image}
                  alt="Medieval Sword"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="card-contact-desc">
              {contactCard.description}
              <br />
              she has many faces:
            </div>

            <div className="card-contact-content">
              <h2 className="card-contact-name">{contactCard.contact?.name}</h2>
              <div className="card-contact-position">
                {contactCard.contact?.position}
              </div>
              <div className="card-contact-email">
                {contactCard.contact?.email}
              </div>

              <div className="card-contact-info">
                <div className="card-contact-info-row">
                  <div className="card-contact-info-icon">⚔️</div>
                  <span className="card-contact-info-text">
                    {contactCard.contact?.email}
                  </span>
                </div>
                <div className="card-contact-info-row">
                  <div className="card-contact-info-icon">🎭</div>
                  <span className="card-contact-info-text">
                    {contactCard.contact?.phone}
                  </span>
                </div>
              </div>

              <div className="card-contact-about">
                <div className="card-contact-about-title">
                  {contactCard.about?.title}
                </div>
                <div className="card-contact-about-year">
                  {contactCard.about?.year}
                </div>
                <div className="card-contact-about-desc">
                  {contactCard.about?.description}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="card-logo">
            <div className="card-logo-icon">🐺</div>
            <h1 className="card-logo-title">{logoCard.title}</h1>
            <p className="card-logo-desc">{logoCard.description}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="card-map">
            <div className="card-map-image">
              {mapCard.image && mapCard.title && (
                <Image
                  src={mapCard.image}
                  alt={mapCard.title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="card-map-gradient"></div>
              <div className="card-map-content">
                <h4 className="card-map-title">{mapCard.title}</h4>
                <p className="card-map-desc">{mapCard.description}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="card-details">
            <div className="card-details-content">
              <h3 className="card-details-title">
                {detailsCard.title || "Bastard of Winterfell"}
              </h3>
              <div className="card-details-desc">
                {detailsCard.description || "King in the North"}
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#f3f4f6",
                  color: "#1f2937",
                }}
                whileTap={{ scale: 0.95 }}
                className="card-details-btn">
                Bend the Knee
              </motion.button>
            </div>

            {detailsCard.image && (
              <div className="card-details-image">
                <Image
                  src={detailsCard.image}
                  alt={detailsCard.title || "Details"}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="card-details-gradient"></div>
            <div className="card-details-circle1"></div>
            <div className="card-details-circle2"></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Column2Grid;
