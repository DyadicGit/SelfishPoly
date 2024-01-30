import React from "react";
import s from "./Skeletons.module.scss";
import classnames from "classnames";

const SkeletonBox = () => (
  <div className={classnames(s.box, s.skeletonLoader)}></div>
);

const SkeletonLine = () => (
  <div className={classnames(s.line, s.skeletonLoader)}></div>
);

const SkeletonCircle = () => (
  <div className={classnames(s.circle, s.skeletonLoader)}></div>
);

const SkeletonShortLine = () => (
  <div className={classnames(s.shortLine, s.skeletonLoader)}></div>
);

export const SkeletonCard = () => (
  <div className={s.container}>
    <div className={s.card}>
      <SkeletonBox />
      <SkeletonLine />
      <div className={s.infoWrapper}>
        <SkeletonCircle />
        <SkeletonShortLine />
      </div>
    </div>
  </div>
);

export const SkeletonList = () => (
  <div className={classnames(s.container, s.vertical)}>
    {Array.from(Array(5), (_, i) => (
      <SkeletonLine key={i} />
    ))}
  </div>
);
