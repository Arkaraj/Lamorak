import { Coupon } from "../entities/Coupon";

export const updateCoupon = async (couponId: string, updateCoupon: any) => {
  const coupon = await Coupon.findOne(couponId);

  return Coupon.save({
    ...coupon, // existing fields
    ...updateCoupon, // updated fields
  });
};
