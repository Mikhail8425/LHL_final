import React from "react";
import "../styles/plans.scss";

const Plans = () => {
  const plans = [
    {
      id: 1,
      name: 'Monthly Plan',
      price: 19.99,
      billingCycle: 'month',
      description: 'This is a great plan for getting started.'
    },
    {
      id: 2,
      name: 'Yearly Plan',
      price: 199.99,
      billingCycle: 'year',
      description: 'This is a great plan for saving money.'
    }
  ];

  return (
    <div className="body-wrapper subscription-plans-container" >
      <h2>Subscription Plans</h2>
      <ul>
        {plans.map(plan => (
          <li key={plan.id} >
            <h3>{plan.name}</h3>
            <p>${plan.price.toFixed(2)} / {plan.billingCycle}</p>
            <p>{plan.description}</p>
            {/* You can add more details here, like features included in each plan */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Plans;