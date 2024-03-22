import React from "react";
import "../styles/plans.scss";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const Plans = () => {
  const user_id = cookies.get("user_id");
  console.log(user_id);
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

  const handlePlanSelection = (user_id) => {
    console.log('handlePlanSelection')
  };

  return (
    <div className="body-wrapper subscription-plans-container" >
      <h2>Subscription Plans</h2>
      <ul>
        {plans.map(plan => (
          <li key={plan.id}>
            <button className="plan-button" onClick={() => handlePlanSelection(plan.id)}>
              <h3>{plan.name}</h3>
              <p>${plan.price.toFixed(2)} / {plan.billingCycle}</p>
              <p>{plan.description}</p>
              {/* You can add more details here, like features included in each plan */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Plans;