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
function isPlacableBy(
  givenUser: User,
  givenOrder: Order,
): boolean {
  try {
    if (!givenUser.isPremium) {
      return givenUser.isAdmin;
    }
    else
    {
      if ((givenOrder.amount <= 1000)) {
        return (givenOrder.type === "bulk") && !givenUser.isTrial;
      }
      else
      {
        if (givenOrder.hasDiscount) {
          return false;
        }
        else
        {
          if ((givenUser.region === "EU")) {
            return (givenOrder.currency === "EUR")
          }
          else
          {
            return givenOrder.items.every($0 => ($0.price >= 0));
          }
        }
      }
    }
  } catch {
    // Just to be safe.
    return false;
  }
}

type OrderStatus = "approved" | "rejected";

function reviewPlacedBy(
  givenUser: User,
  givenOrder: Order,
): OrderStatus {
  return isPlacableBy(givenUser, givenOrder)
    ? "approved"
    : "rejected";
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
