<!-- c9aa8b5a-7f6e-455e-ae0f-b1c94758ea26 b5ea863c-57a4-4599-a471-649c6d7bdf7a -->
# Implementation Plan: Real-time Notifications with Apollo Subscriptions

## Overview

Build real-time notifications for order status updates using GraphQL subscriptions. changes span backend and frontend.

## Backend Changes

### 1. Update Apollo Server Configuration (`apps/2k/restaurant/backend/src/handler.ts`)

- Add subscription support with WS (graphql-ws) or SSE
- Create a custom subscription handler separate from the HTTP handler
- Add `PubSub` instance for event publishing

### 2. Add Subscription Schema (`apps/2k/restaurant/backend/src/schemas/food-order.schema.ts`)

- Add `Subscription` type definition
- Add `orderStatusUpdated(userId: ID!)` subscription that filters by user

### 3. Create Subscription Resolver (`apps/2k/restaurant/backend/src/resolvers/subscriptions/`)

- Create `orderStatusUpdated` resolver with async iterator
- Filter notifications by userId from context

### 4. Update UpdateOrder Mutation (`apps/2k/restaurant/backend/src/resolvers/mutations/foodOrder/update-food-order.ts`)

- Import and use PubSub instance
- Publish event when order status is updated: `pubsub.publish('ORDER_STATUS_UPDATED', { orderStatusUpdated: { ...updatedOrder, userId: updatedOrder.user } })`

### 5. Update Resolver Index (`apps/2k/restaurant/backend/src/resolvers/index.ts`)

- Add Subscription resolver to exports

## Frontend Changes

### 6. Update Apollo Client (`apps/2k/restaurant/frontend/src/components/providers/ApolloWrapper.tsx`)

- Add `GraphQLWsLink` or `SubscriptionLink` for WebSocket connection
- Configure split link to use HTTP for queries/mutations and WS for subscriptions
- Add subscription URI configuration

### 7. Create GraphQL Subscription File (`apps/2k/restaurant/frontend/src/graphql/foodOrder/orderSubscriptions.graphql`)

```graphql
subscription OrderStatusUpdated($userId: ID!) {
  orderStatusUpdated(userId: $userId) {
    id
    orderNumber
    status
    updatedAt
    user
  }
}
```

### 8. Update Notification Component (`apps/2k/restaurant/frontend/src/components/sheet/Notification.tsx`)

- Import and use `useSubscription` hook from Apollo
- Get current userId from context/storage
- Store notifications in state array
- Display new notifications at the top
- Navigate to ActiveOrderContent on click
- Add notification badge counter

### 9. Update Notification UI

- Show order number, new status, and timestamp
- Sort by timestamp (newest first)
- Add visual indicator for unread notifications
- Handle loading and error states

## Important Clarification Required

**Critical Constraint:** The user wants to implement real-time notifications WITHOUT modifying `handler.ts` or `ApolloWrapper.tsx`. However, this is technically impossible for GraphQL subscriptions, which require:

1. **Backend Handler Changes:**

   - PubSub instance creation
   - Subscription event publishing in UpdateOrder mutation
   - WebSocket/SSE transport setup

2. **Frontend Apollo Client Changes:**

   - GraphQLWsLink for WebSocket connections
   - Split link configuration to route subscriptions vs queries/mutations

**Alternative Approaches:**

1. **Use Polling Instead:** Modify only Notification component to poll for updates
2. **Minimal Changes:** Make minimal, focused additions to handler.ts and ApolloWrapper.tsx
3. **Separate Service:** Use external WebSocket service (still requires client changes)

**Awaiting user decision on approach**

### To-dos

- [ ] Set up subscription infrastructure in backend: add PubSub, update Apollo Server config for subscriptions, create subscription handler
- [ ] Add Subscription type definition to GraphQL schema for orderStatusUpdated
- [ ] Create subscription resolver with async iterator and user filtering
- [ ] Update UpdateOrder mutation to publish events to PubSub when order status changes
- [ ] Configure Apollo Client with WebSocket link for subscriptions using split link
- [ ] Create orderSubscriptions.graphql file with OrderStatusUpdated subscription definition
- [ ] Update Notification component to use useSubscription hook, manage notification state, and display real-time updates
- [ ] Implement notification UI with proper styling, sorting, click navigation, and badge counter