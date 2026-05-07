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

/** A tangled, messy function. */
function approveOrder(
  givenOrder: Order,
  user: User,
): string {
  try {
    if (user.isPremium) {
      if (givenOrder.amount > 1000) {
        if (!givenOrder.hasDiscount) {
          if (user.region !== "EU") {
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
        if (givenOrder.type === "bulk" && !user.isTrial) {
          return "approved";
        } else {
          return "rejected";
        }
      }
    } else {
      if (user.isAdmin) {
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

/**
 * try {
    if ((user.isPremium && user.region !== "EU") && (order.amount > 1000 && !order.hasDiscount)) {
      for (const item of order.items) {
        if (item.price < 0) {
          return "rejected";
        }
      }
        return "approved";
      }
    else if (user.isAdmin) {
      return "approved"
    }
    else if (order.type === "bulk" && !user.isTrial) {
      return "approved";
    }
    else {
      return "rejected";
    }
  } catch {
    // Just to be safe.
    return "rejected";
  }
 */

function main(): void {
  // Create a sample user and order that barely passes the approval rules.
  const user: User = {
    isPremium: true,
    isAdmin: false,
    isTrial: false,
    region: "US",
  };

  const order: Order = {
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

  const result = approveOrder(order, user);
  console.log(`Order approval result: ${result}`);
}

main();
