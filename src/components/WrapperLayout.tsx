"use client";

import { store } from "@/store/store";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const WrapperLayout = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // We want to wait for the page to be fully loaded before applying the styles
    // to avoid FOUC (Flash of Unstyled Content)
    const onLoad = () => {
      setIsReady(true);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  if (!isReady) return null;

  return <Provider store={store}>{children}</Provider>;
};

export default WrapperLayout;
