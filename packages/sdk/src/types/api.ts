/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/chains": {
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              chains?: {
                  id?: number;
                  name?: string;
                  displayName?: string;
                  httpRpcUrl?: string;
                  wsRpcUrl?: string;
                  explorerUrl?: string;
                  explorerName?: string;
                  depositEnabled?: boolean;
                  currency?: {
                    symbol?: string;
                    name?: string;
                    decimals?: number;
                  };
                }[];
            };
          };
        };
      };
    };
  };
  "/admin/chains": {
    get: {
      parameters: {
        header: {
          "x-admin-api-key": string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              chains?: ({
                  id?: number;
                  name?: string;
                  httpRpcUrl?: string;
                  wsRpcUrl?: string | null;
                  targetBalance?: string;
                  capacityPerRequest?: string;
                  feeBpsPrice?: string | null;
                  stack?: string | null;
                  httpRpcUrlPublic?: string | null;
                  wsRpcUrlPublic?: string | null;
                  explorerUrl?: string | null;
                  explorerName?: string | null;
                  displayName?: string | null;
                  depositAddress?: string | null;
                  baseChainId?: number | null;
                  enabled?: boolean;
                  rebalancePercentage?: string | null;
                  bufferPercentage?: string | null;
                  optimismPortal?: string | null;
                  l1CrossDomainMessenger?: string | null;
                  l2OutputOracle?: string | null;
                })[];
            };
          };
        };
        /** @description Default Response */
        401: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
      };
    };
  };
  "/chains/add": {
    post: {
      parameters: {
        header: {
          "x-admin-api-key": string;
        };
      };
      requestBody: {
        content: {
          "application/json": {
            id: number;
            name: string;
            httpRpcUrl: string;
            wsRpcUrl: string;
            targetBalance: string;
            capacityPerRequest: string;
            partialCapacityPerRequestAmount: string;
            feeBpsPrice?: string;
            stack?: string;
            httpRpcUrlPublic: string;
            wsRpcUrlPublic: string;
            explorerUrl: string;
            explorerName: string;
            displayName: string;
            depositAddress?: string;
            baseChainId: number;
            optimismPortal?: string;
            l1CrossDomainMessenger?: string;
            l2OutputOracle?: string;
            rebalancePercentage?: string;
            bufferPercentage?: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
        /** @description Default Response */
        401: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
      };
    };
  };
  "/chains/update": {
    post: {
      parameters: {
        header: {
          "x-admin-api-key": string;
        };
      };
      requestBody: {
        content: {
          "application/json": {
            id: number;
            name?: string;
            httpRpcUrl?: string;
            wsRpcUrl?: string;
            targetBalance?: string;
            capacityPerRequest?: string;
            partialCapacityPerRequestAmount?: string;
            feeBpsPrice?: string;
            stack?: string;
            httpRpcUrlPublic?: string;
            wsRpcUrlPublic?: string;
            explorerUrl?: string;
            explorerName?: string;
            displayName?: string;
            depositAddress?: string;
            baseChainId?: number;
            optimismPortal?: string;
            l1CrossDomainMessenger?: string;
            l2OutputOracle?: string;
            rebalancePercentage?: string;
            bufferPercentage?: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
        /** @description Default Response */
        401: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
      };
    };
  };
  "/chains/status": {
    post: {
      parameters: {
        header: {
          "x-admin-api-key": string;
        };
      };
      requestBody?: {
        content: {
          "application/json": {
            chainId?: number;
            enabled?: boolean;
            partialDisable?: boolean;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
        /** @description Default Response */
        401: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
      };
    };
  };
  "/config": {
    get: {
      parameters: {
        query?: {
          originChainId?: string;
          destinationChainId?: string;
          user?: string;
          currency?: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              enabled?: boolean;
              user?: {
                balance?: string;
              };
              solver?: {
                address?: string;
                balance?: string;
                capacityPerRequest?: string;
              };
            };
          };
        };
      };
    };
  };
  "/execute/call": {
    post: {
      requestBody: {
        content: {
          "application/json": {
            user: string;
            originChainId: number;
            destinationChainId: number;
            txs?: {
                to?: string;
                value?: string;
                data?: string;
              }[];
            source?: string;
            allowSplitRouting?: boolean;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              steps?: {
                  id?: string;
                  action?: string;
                  description?: string;
                  kind?: string;
                  items?: {
                      status?: string;
                      data?: unknown;
                      check?: {
                        endpoint?: string;
                        method?: string;
                      };
                    }[];
                }[];
              fees?: {
                gas?: string;
                relayer?: string;
                relayerGas?: string;
                relayerService?: string;
              };
              breakdown?: {
                  value?: string;
                  timeEstimate?: number;
                }[];
              balances?: {
                userBalance?: string;
                requiredToSolve?: string;
              };
            };
          };
        };
        /** @description Default Response */
        400: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
        /** @description Default Response */
        401: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
      };
    };
  };
  "/lives": {
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
      };
    };
  };
  "/intents/status": {
    get: {
      parameters: {
        query?: {
          requestId?: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              status?: string;
              details?: string;
              txHashes?: string[];
              time?: number;
              originChainId?: number;
              destinationChainId?: number;
            };
          };
        };
      };
    };
  };
  "/intents/quote": {
    post: {
      requestBody: {
        content: {
          "application/json": {
            request: Record<string, never>;
            source?: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              requestId?: string;
              shortRequestId?: string;
              currency?: string;
              price?: string;
              relayerFee?: string;
              depositGasFee?: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
      };
    };
  };
  "/intents/trigger": {
    post: {
      requestBody?: {
        content: {
          "application/json": {
            request?: Record<string, never>;
            signature?: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              message?: string;
              requestId?: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
      };
    };
  };
  "/requests": {
    get: {
      parameters: {
        query?: {
          limit?: string;
          continuation?: string;
          user?: string;
          hash?: string;
          originChainId?: string;
          destinationChainId?: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              requests?: {
                  id?: string;
                  status?: string;
                  user?: string;
                  data?: {
                    fees?: {
                      gas?: string;
                      fixed?: string;
                      price?: string;
                    };
                    feesUsd?: {
                      gas?: string;
                      fixed?: string;
                      price?: string;
                    };
                    externalActions?: {
                        price?: string;
                      }[];
                    inTxs?: {
                        fee?: string;
                        data?: {
                          to?: string;
                          data?: string;
                          from?: string;
                          value?: string;
                        };
                        hash?: string;
                        type?: string;
                        chainId?: number;
                        timestamp?: number;
                      }[];
                    price?: string;
                    outTxs?: {
                        fee?: string;
                        data?: {
                          to?: string;
                          data?: string;
                          from?: string;
                          value?: string;
                        };
                        hash?: string;
                        type?: string;
                        chainId?: number;
                        timestamp?: number;
                      }[];
                  };
                  createdAt?: string;
                  updatedAt?: string;
                }[];
              continuation?: string;
            };
          };
        };
      };
    };
  };
  "/transactions/index": {
    post: {
      parameters: {
        header: {
          "x-admin-api-key": string;
        };
      };
      requestBody: {
        content: {
          "application/json": {
            chainId: string;
            block: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
      };
    };
  };
  "/transactions/status": {
    get: {
      parameters: {
        query?: {
          chainId?: string;
          hash?: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              status?: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          content: {
            "application/json": {
              status?: string;
            };
          };
        };
      };
    };
  };
  "/users/balance": {
    get: {
      parameters: {
        query?: {
          user?: string;
          currency?: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              balance?: string;
            };
          };
        };
      };
    };
  };
  "/admin/rebalance": {
    post: {
      parameters: {
        header: {
          "x-admin-api-key": string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
        /** @description Default Response */
        401: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
      };
    };
  };
  "/admin/tx-confirmation-delay": {
    post: {
      parameters: {
        header: {
          "x-admin-api-key": string;
        };
      };
      requestBody?: {
        content: {
          "application/json": {
            delay?: number;
            threshold?: number;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
        /** @description Default Response */
        401: {
          content: {
            "application/json": {
              message?: string;
            };
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
