---
layout: post
title: "RL Part 1 – Foundations"
tags: ["Reinforcement Learning", "Notes"]
---

Reinforcement Learning (RL) is all about learning through interaction. An agent observes the world, takes actions, receives rewards, and learns to make better decisions over time. This first part of the series covers fundamental RL concepts: value functions, Monte-Carlo methods, Temporal-Difference learning, on-policy vs off-policy learning, and more.
## K-Armed Bandits

A *k-armed bandit* is one of the simplest RL settings. Each action corresponds to pulling an arm of a slot machine.

### **Action Value**
The true value of an action \( a \) is:

\[
q_\ast(a) = \mathbb{E}[R_t \mid A_t = a]
\]

Where:

- \( A_t \): action selected at time \( t \)  
- \( q_\ast(a) \): true value of action \( a \)  
- \( R_t \): reward  
- \( Q_t(a) \): estimated value of action \( a \) at time \( t \)

---

## **Greedy Action Selection**

\[
A_t = \arg\max_a Q_t(a)
\]

A greedy action is simply the action with the **highest estimated value**.

---

## **ε-Greedy Action Selection**

With probability:

- \( 1 - \varepsilon \): choose the greedy action  
- \( \varepsilon \): choose a random action  

### **Example Question**

**Q:**  
For a 2-action bandit with \( \varepsilon = 0.5 \), what is the probability of selecting the greedy action?

**A:**  
- With probability \( 1 - \varepsilon = 0.5 \), choose greedy directly  
- With probability \( \varepsilon = 0.5 \), a random action is chosen among 2 actions  
  - So the greedy action is chosen with probability \( 0.5 \times \frac{1}{2} = 0.25 \)

**Total probability:**

\[
0.5 + 0.25 = 0.75
\]

---

# **RL Taxonomy Diagram (Text Version)**

```
RL
├── Model-Based RL
│   ├── Dynamic Programming (DP)
│   ├── MPC
│   └── MuZero
│
└── Model-Free RL
    ├── Value-Based RL
    │   ├── Monte-Carlo
    │   │   ├── MC Prediction
    │   │   └── MC Control
    │   │
    │   ├── TD Learning
    │   │   ├── TD(0), TD(n)
    │   │   └── TD(λ)
    │   │
    │   └── Q-Learning (Off-policy TD Control)
    │       └── Deep Variants: DQN, Double DQN, etc.
    │
    └── Policy-Based RL
        ├── REINFORCE (MC-based)
        ├── Actor–Critic (TD-based)
        │   ├── A2C, A3C
        │   ├── PPO
        │   ├── DDPG, TD3
        │   └── SAC
```

---

# **On-Policy vs Off-Policy**

### **On-Policy**
Learn from the **same policy you act with**.  
Examples: **SARSA, Actor–Critic**

### **Off-Policy**
Learn about one policy while behaving under another.  
Examples: **Q-Learning, DQN**

---

# **Monte-Carlo Methods (MC)**

MC methods estimate value functions by averaging **returns from complete episodes**.

---

## **MC Value Estimation**

If state \( s \) is visited \( N(s) \) times and observed returns are:

\[
G_1, G_2, \ldots, G_{N(s)}
\]

The MC estimate is:

\[
V(s) = \frac{1}{N(s)} \sum_{i=1}^{N(s)} G_i
\]

### **First-Visit MC**

Update only the first time \( s \) appears.

### **Every-Visit MC**

Update on every occurrence.

---

# **MC Control**

Objective:

\[
\pi^\ast = \arg\max_\pi V^\pi(s)
\quad \text{or} \quad
\pi^\ast = \arg\max_\pi Q^\pi(s,a)
\]

Policy improvement step:

\[
\pi(s) \leftarrow \arg\max_a Q(s,a)
\]

---

# **Temporal-Difference Learning (TD)**

TD combines:

- **MC** → learning from experience  
- **DP** → bootstrapping from estimates  

---

## **TD(0) Update Rule**

\[
V(S_t) \leftarrow V(S_t) + \alpha \left[ R_{t+1} + \gamma V(S_{t+1}) - V(S_t) \right]
\]

TD error:

\[
\delta_t = R_{t+1} + \gamma V(S_{t+1}) - V(S_t)
\]

---

# **n-Step TD**

Return:

\[
G_t^{(n)} = R_{t+1} + \gamma R_{t+2} + \cdots + \gamma^n V(S_{t+n})
\]

Update:

\[
V(S_t) \leftarrow V(S_t) + \alpha \left[ G_t^{(n)} - V(S_t) \right]
\]

---

# **TD(λ) — Eligibility Traces**

\[
G_t^\lambda = (1 - \lambda) \sum_{n=1}^{\infty} \lambda^{n-1} G_t^{(n)}
\]

Special cases:

- \( \lambda = 0 \Rightarrow \) TD(0)  
- \( \lambda = 1 \Rightarrow \) Monte-Carlo  

---

# **Value Functions**

\[
V_\pi(s) = \mathbb{E}_\pi[G_t \mid S_t = s]
\]

\[
q_\pi(s,a) = \mathbb{E}_\pi[G_t \mid S_t = s, A_t = a]
\]

---

# **Bellman Equation**

\[
V_\pi(s) = \sum_a \pi(a\mid s)
\sum_{s',r} p(s',r \mid s,a)
\left[ r + \gamma V_\pi(s') \right]
\]

---

# **Gridworld Example**

State values updated via:

\[
V(s) = \frac{1}{4} \sum_a \left[ r + V(s') \right]
\]

Repeated sweeps → convergence.

---

# **MDPs**

Return definition:

\[
G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \cdots
= \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}
\]

---

# **End of RL Part 1**


---

# **Gridworld Example (Full Step-by-Step Breakdown)**

We consider the following gridworld:

```
+---+---+---+---+
| T |   |   |   |
+---+---+---+---+
|   |   |   |   |
+---+---+---+---+
|   |   |   | T |
+---+---+---+---+
```

- Terminal states:  
  - \( (0,0) \)  
  - \( (3,3) \)
- Value of terminal states:  
  \[
  V(T) = 0
  \]
- Reward:  
  \[
  R = -1 \quad \text{each step until terminal}
  \]
- Policy: equiprobable random  
  \[
  \pi(a|s) = \frac{1}{4}
  \]
- Discount factor:  
  \[
  \gamma = 1
  \]

---

# **State (0,1) — Value Update (Sweep 1)**

\[
s = (0,1)
\]

Actions and transitions:

- **Left** → \( (0,0) \) terminal  
- **Right** → \( (0,2) \)  
- **Up** → wall → stays \( (0,1) \)  
- **Down** → \( (1,1) \)

---

## **Action-wise Value Computation**

### **Left**
\[
V(0,1)_{\text{Left}} = \frac{1}{4}(-1 + V(0,0)) = -0.25
\]

### **Right**
\[
V(0,1)_{\text{Right}} = \frac{1}{4}(-1 + V(0,2)) = -0.25
\]

### **Up**
\[
V(0,1)_{\text{Up}} = \frac{1}{4}(-1 + V(0,1)) = -0.25
\]

### **Down**
\[
V(0,1)_{\text{Down}} = \frac{1}{4}(-1 + V(1,1)) = -0.25
\]

---

# **Combine All Directions**

\[
V(0,1) = -0.25 - 0.25 - 0.25 - 0.25 = -1.0
\]

Correcting for included \( \frac{1}{4} \) factors:

\[
V^{(1)}(0,1) = -0.75
\]

---

# **Sweep 2 and Convergence**

- Replace all values with Sweep 1 results.  
- Repeat evaluation for all states.  
- Continue sweeps until **value function converges**.  

This yields the **true value function** under the equiprobable random policy.

