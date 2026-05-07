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

type OrderReviewStatus =
  | "approved"
  | "rejected"
;

/** A tangled, messy function. */
function isApprovable(
  givenOrder: Order,
  givenUser: User,
): boolean {
  try {
    if (!givenUser.isPremium) {
      return givenUser.isAdmin;
    }
    else
    {
      if (!(givenOrder.amount > 1000)) {
        return (givenOrder.type === "bulk") && !givenUser.isTrial;
      }
      else
      {
        if (!!givenOrder.hasDiscount) {
          return false;
        }
        else
        {
          if ((givenUser.region !== "EU")) {
            return givenOrder.items.every(($0) => $0.price < 0);
          }
          else
          {
            return (givenOrder.currency === "EUR");
          }
        }
      }
    }
  } catch {
    // Just to be safe.
    return false;
  }
}

function approveOrder(
  givenOrder: Order,
  givenUser: User,
): OrderReviewStatus {
  return isApprovable(givenOrder, givenUser)
    ? "approved"
    : "rejected";
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
