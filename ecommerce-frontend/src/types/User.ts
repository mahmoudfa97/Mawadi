export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: Date;
    gender: 'male' | 'female' | 'other' | 'prefer not to say';
    addresses: IAddress[];
    orders: string[];
    wishlist: string[];
    reviews: string[];
    giftPreferences?: string[];
    giftCardsReceived?: string[];
    giftCardsPurchased?: string[];
    lastLogin?: Date;
    notificationPreferences: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    loyaltyPoints: number;
    referralCode: string;
    referredBy?: string;
    role: 'user' | 'admin';
}

interface IAddress {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }