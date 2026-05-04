import React from "react";

export default function DietPlanner() {
  return (
    <div className="grid2">
      <div className="card">
        <div className="cardHeader">
          <div>
            <h1 className="h1">Diet Planner</h1>
            <div className="muted">Veg and Non-Veg options (high protein + fiber).</div>
          </div>
          <span className="pill">PCOS-friendly</span>
        </div>

        <h2 className="h2">Breakfast (High Protein + Fiber = Must) ✅</h2>
        <div className="divider" />
        <table>
          <thead>
            <tr>
              <th>Veg Options</th>
              <th>Non-Veg Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Vegetable oats / poha (1 cup cooked)
                <br />
                Multigrain rotis + paneer bhurji (2 small rotis + 50–60g paneer)
                <br />
                Moong dal chilla + curd (2 medium chillas + 1/2 cup curd)
                <br />
                Ragi dosa / ragi idli (2 medium pieces) with sambar
                <br />
                Smoothie: Spinach + berries + flaxseeds + unsweetened almond milk (1 glass)
              </td>
              <td>
                Boiled eggs (2) + 1 multigrain toast
                <br />
                Omelette with veggies (2 eggs + veggies, cooked in minimal oil)
                <br />
                Egg bhurji + 1 roti (multigrain)
              </td>
            </tr>
          </tbody>
        </table>

        <div className="divider" />
        <h2 className="h2">Lunch (Balanced Plate Rule)</h2>
        <div className="divider" />
        <table>
          <thead>
            <tr>
              <th>Veg Options</th>
              <th>Non-Veg Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Brown rice / millet (1 cup cooked) + dal (1/2–1 cup) + sabzi (1 cup)
                <br />
                2 rotis (multigrain or jowar/bajra) + curd (1/2 cup) + mixed veg (1 cup)
                <br />
                Quinoa (3/4–1 cup cooked) + rajma/chickpeas (1/2 cup)
                <br />
                Ragi mudde / millet khichdi (1 cup) with vegetable sambar
              </td>
              <td>
                Grilled chicken/fish (80–100g) + 1–2 rotis + salad (1 cup)
                <br />
                Egg curry (2 eggs, less oil) + brown rice (3/4–1 cup)
                <br />
                Fish curry (80–100g) + veggies (1 cup) + small millet portion
              </td>
            </tr>
          </tbody>
        </table>

        <div className="divider" />
        <h2 className="h2">Evening Snack</h2>
        <div className="muted" style={{ lineHeight: 1.7 }}>
          Green tea / herbal tea
          <br />
          Roasted chana / makhana
          <br />
          Peanut chaat
          <br />
          Boiled corn (small portion)
        </div>

        <div className="divider" />
        <h2 className="h2">Dinner (Light + Early)</h2>
        <div className="divider" />
        <table>
          <thead>
            <tr>
              <th>Veg Options</th>
              <th>Non-Veg Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Vegetable soup (1–1.5 cups) + paneer (40–50g)
                <br />
                Stir-fried veggies + tofu (1 cup veggies + 60–80g tofu)
                <br />
                1 roti (multigrain) + sabzi (1 cup) + curd (1/2 cup)
              </td>
              <td>
                Grilled fish/chicken (60–80g) + salad (1 cup)
                <br />
                Egg white omelette (2–3 whites) + veggies
                <br />
                Clear chicken soup (1–1.5 cups)
              </td>
            </tr>
          </tbody>
        </table>

        <div className="divider" />
        <h2 className="h2">Healthy Drinks (Throughout the Day)</h2>
        <div className="muted" style={{ lineHeight: 1.7 }}>
          Water (2.5–3 litres/day)
          <br />
          Spearmint tea (good for PCOD)
          <br />
          Buttermilk
          <br />
          Cinnamon / jeera water
        </div>

        <div className="divider" />
        <h2 className="h2">Healthy Snacks (When Craving)</h2>
        <div className="muted" style={{ lineHeight: 1.7 }}>
          Dark chocolate (70% – small piece)
          <br />
          Peanut butter (1 tsp)
          <br />
          Yogurt with seeds
          <br />
          Fruit + nuts combo
        </div>

        <div className="divider" />
        <h2 className="h2">PCOS-Friendly Millets & Whole Grains</h2>
        <div className="muted" style={{ lineHeight: 1.7 }}>
          Aim for **1–2 servings/day** of complex carbs:
          <br />
          • Ragi, jowar, bajra rotis – 1–2 small rotis per main meal
          <br />
          • Brown rice / millet (foxtail, little, kodo, barnyard) – 3/4–1 cup cooked
          <br />
          • Oats / broken wheat / quinoa – 1 cup cooked per meal
        </div>

        <div className="divider" />
        <h2 className="h2">Fruits – Portion Guidance</h2>
        <div className="muted" style={{ lineHeight: 1.7 }}>
          Prefer low–medium GI fruits. Target **1–2 servings/day**:
          <br />
          • 1 small apple / orange / pear
          <br />
          • 1/2 cup berries / pomegranate
          <br />
          • 1 small guava / 1 kiwi
          <br />
          Limit banana/mango to **1–2 times per week** and pair with nuts for better blood sugar control.
        </div>

        <div className="divider" />
        <h2 className="h2">Vegetable Intake</h2>
        <div className="muted" style={{ lineHeight: 1.7 }}>
          Try to fill **1/2 of your plate** with vegetables at lunch and dinner:
          <br />
          • 2–3 cups/day of mixed veg (palak, methi, lauki, tori, bhindi, beans, carrot, cucumber, capsicum)
          <br />
          • Include at least **1 leafy green** (palak/methi/sarson) 3–4 times/week.
        </div>
      </div>

      <div className="card">
        <div className="cardHeader">
          <div>
            <h2 className="h2">Foods to Avoid (Chart)</h2>
            <div className="muted">Use this as a quick checklist.</div>
          </div>
          <span className="pill">Reduce sugar + fried foods</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Meal</th>
              <th>Foods to avoid</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Breakfast</td>
              <td>
                White bread, bakery items
                <br />
                Sugary cereals, cornflakes
                <br />
                Tea/coffee with sugar on empty stomach
                <br />
                Packaged drinks
                <br />
                Bananas & mangoes daily (ok occasionally)
              </td>
            </tr>
            <tr>
              <td>Lunch</td>
              <td>
                White rice daily
                <br />
                Deep-fried foods
                <br />
                Heavy creamy curries
                <br />
                Samosa, pakoda, biscuits
                <br />
                Sugary coffee
                <br />
                Instant noodles
              </td>
            </tr>
            <tr>
              <td>Dinner</td>
              <td>
                Heavy rice meals
                <br />
                Oily food
                <br />
                Late-night eating
              </td>
            </tr>
          </tbody>
        </table>

        <div className="divider" />
        <div className="ok">
          Tip: Build a “balanced plate” → 1/2 veggies, 1/4 protein, 1/4 complex carbs + healthy fats.
        </div>
      </div>
    </div>
  );
}

