import { SubscriptionClient } from 'subscriptions-transport-ws';
import { Client, defaultExchanges, subscriptionExchange } from 'urql';

export const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {
  reconnect: true,
  timeout: 20000,
});

export const client = new Client({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});
