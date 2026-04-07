class Item {
  constructor(
    public name: string,
    public price: number,
  ) {}
};

interface Order {
  amount: number;
  hasDiscount: boolean;
  region: string;
  currency: string;
  type: string; // e.g. "bulk" or "normal"
  items: Item[];
};

interface User {
  isPremium: boolean;
  isAdmin: boolean;
  isTrial: boolean;
  region: string;
};

type OrderStatus = string;

/** A tangled, messy function. */
function reviewPlacedBy(
  givenUser: User,
  givenOrder: Order,
): OrderStatus {
  try {
    if (givenUser.isPremium) {
      if (givenOrder.amount > 1000) {
        if (!givenOrder.hasDiscount) {
          if (givenUser.region !== "EU") {
            for (const item of givenOrder.items) {
              if (item.price < 0) {
                return "rejected";
              }
            }
            return "approved";
          } else {
            if (givenOrder.currency === "EUR") {
              return "approved";
            } else {
              return "rejected";
            }
          }
        } else {
          return "rejected";
        }
      } else {
        if (givenOrder.type === "bulk" && !givenUser.isTrial) {
          return "approved";
        } else {
          return "rejected";
        }
      }
    } else {
      if (givenUser.isAdmin) {
        return "approved";
      } else {
        return "rejected";
      }
    }
  } catch {
    // Just to be safe.
    return "rejected";
  }
}

function main(): void {
  // Create a sample user and order that barely passes the approval rules.
  const sampleUser: User = {
    isPremium: true ,
    isAdmin  : false,
    isTrial  : false,
    region   : "US" ,
  };

  const sampleOrder: Order = {
    amount: 1500,
    hasDiscount: false,
    region: "EU",
    currency: "USD",
    type: "normal",
    items: [
      new Item("Keyboard", 100.0),
      new Item("Monitor", 200.0),
      new Item("Mouse", 50.0),
    ],
  };

  const sampleResult = reviewPlacedBy(sampleUser, sampleOrder);
  console.log(`Order approval result: ${sampleResult}`);
}

main();
