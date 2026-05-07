type Branded<
  SomePrimitive extends string | number,
  SomeBrandName extends string,
> = SomePrimitive & {
  readonly _brand: SomeBrandName,
};

type Option<SomeObject> = SomeObject | null | undefined;

type Price = Branded<number, "Price">;

const Price = {
  is: (
    givenValue: number
  ): givenValue is Price => {
    return givenValue >= 0;
  },
  make(
    givenValue: number,
  ): Price {
    if (
      !this.is(givenValue)
    ) throw new Error("Price cannot be negative.");
    
    return givenValue;
  }
}

class Item {
  constructor(
    public name: string,
    public price: Price,
  ) {}
};

interface Order {
  amount: number;
  hasDiscount: boolean;
  region: string;
  currency: string;
  type: "bulk" | "normal";
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
  if (!givenUser.isPremium) {
    return givenUser.isAdmin;
  }
  else
  if (givenOrder.amount <= 1000) {
    return (givenOrder.type === "bulk") && !givenUser.isTrial;
  }
  else
  if (givenOrder.hasDiscount) {
    return false;
  }
  else
  if (givenUser.region === "EU") {
    return (givenOrder.currency === "EUR");
  }
  else
  {
    return true;
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
      new Item("Keyboard", Price.make(100.0)),
      new Item("Monitor", Price.make(200.0)),
      new Item("Mouse", Price.make(50.0)),
    ],
  };
  
  

  const result = approveOrder(order, user);
  console.log(`Order approval result: ${result}`);
}

main();
