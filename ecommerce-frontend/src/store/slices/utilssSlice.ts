import { createSlice } from '@reduxjs/toolkit';
import { IUtils } from '../../types/Constants';


const initialState: IUtils = {
  occasions: [
    { name: 'سفر', icon: '/travel.jpeg' },
    { name: 'أحبك', icon: '/iloveu.jpeg' },
    { name: 'زواج', icon: '/weddings.jpeg' },
    { name: 'يوم الميلاد', icon: '/birthday.jpeg' },
    { name: 'منزل مبارك', icon: '/newhouse.jpeg' },
    { name: 'شكرا', icon: '/thanku.jpeg' },
    { name: 'الذكرى السنوية', icon: '/anniversary.jpeg' },
    { name: 'مولود جديد', icon: '/newborn.jpeg' },
    { name: 'أجر وعافية', icon: '/getwellsoon.jpeg' },
    { name: 'تهانينا', icon: '/congrats.jpeg' }
  ],
  categories: [
    { name: 'الصحة والجمال', icon: 'healthandbeati.png' },
    { name: 'الاكسسوارات', icon: 'accessories.png',subCategories: [
      { name: 'الحقائب و المحافظ' },
      { name: 'التراجي' },
      { name: 'الساعات' },
      { name: 'النظارات' },
      { name: 'الخواتم' },
    ], },
    { name: 'البيت', icon: 'fortune.png', subCategories: [
      { name: 'البخور' },
      { name: 'المباخر' },
      { name: 'ديكورات المنزل' },
      { name: 'موزعات العطور' },
      { name: 'الشموع' },
      { name: 'أدوات المائدة' },
      { name: 'أدوات تناول الطعام و المطبخ' },
      { name: 'الشاي و القهوة' },
    ], },
    {
      name: 'اختيارات مودة', icon: 'randommawadi.png', subCategories: [
        { name: 'أدوات مميزة' },
        { name: 'العطور' },
        { name: 'الهواتف' },
      ]
    },
    { name: 'الورود', icon: 'flowers.png' },
    { name: 'الصحة و اللياقة', icon: 'healthandsport.png' },
    { name: 'الأطفال', icon: 'kids.png' },
    { name: 'الألعاب', icon: 'toys.png' },
    { name: 'زوارة', icon: 'visits.png', subCategories: [
      { name: 'الحلويات' },
      { name: 'كل منتجات الزوارة' },
      { name: 'الحلويات العربية' },
      { name: 'الكيك' },
    ], },
    { name: 'الأنشطة', icon: 'activities.jpeg' },
    { name: 'هدايا مناسبة', icon: 'specificGifts.png' },
  ]
}

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {

  },
});

export default utilsSlice.reducer;
