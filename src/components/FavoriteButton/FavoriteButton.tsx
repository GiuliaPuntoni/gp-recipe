"use client";

import { Button } from "gpdesign";
import styles from "./FavoriteButton.module.scss";

interface Props {
  className?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: unknown;
}
const FavoriteButton = ({
  className,
  active,
  onClick,
  ...otherProps
}: Props) => {
  return (
    <Button
      aria-label="favorite-button"
      iconLeft="faHeart"
      className={`${className} ${styles["favorite-button"]} ${
        active && styles["active"]
      }`}
      iconLeftType={active ? "solid" : "regular"}
      onClick={onClick}
      {...otherProps}
    ></Button>
  );
};

export default FavoriteButton;
