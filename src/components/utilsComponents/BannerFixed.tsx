"use client";

interface Props {
  children: React.ReactNode;
}

export const BannerFixed = ({ children }: Props) => {
  return (
    <div
      className="gp-p-16 gp-w-100 gp-bg-bg-white gp-position-fixed"
      style={{
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  );
};
export default BannerFixed;
