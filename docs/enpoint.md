{
  "openapi": "3.0.1",
  "info": {
    "title": "SECOM API",
    "version": "v1"
  },
  "paths": {
    "/api/addresses": {
      "get": {
        "tags": [
          "Address"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Profile.Application.DTOs.AddressResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Profile.Application.DTOs.AddressResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Profile.Application.DTOs.AddressResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Address"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Profile.Application.DTOs.CreateAddressRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Profile.Application.DTOs.CreateAddressRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Profile.Application.DTOs.CreateAddressRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.AddressResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.AddressResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.AddressResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/addresses/{id}": {
      "put": {
        "tags": [
          "Address"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Profile.Application.DTOs.UpdateAddressRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Profile.Application.DTOs.UpdateAddressRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Profile.Application.DTOs.UpdateAddressRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.AddressResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.AddressResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.AddressResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Address"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/addresses/{id}/default": {
      "patch": {
        "tags": [
          "Address"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/insights/customers": {
      "get": {
        "tags": [
          "AdminAnalytics"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CustomerInsightsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CustomerInsightsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CustomerInsightsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/categories": {
      "get": {
        "tags": [
          "AdminCategories"
        ],
        "parameters": [
          {
            "name": "searchTerm",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "isActive",
            "in": "query",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "AdminCategories"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.CreateCategoryRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.CreateCategoryRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.CreateCategoryRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/categories/{categoryId}": {
      "put": {
        "tags": [
          "AdminCategories"
        ],
        "parameters": [
          {
            "name": "categoryId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.UpdateCategoryRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.UpdateCategoryRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.UpdateCategoryRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "AdminCategories"
        ],
        "parameters": [
          {
            "name": "categoryId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/categories/{categoryId}/status": {
      "patch": {
        "tags": [
          "AdminCategories"
        ],
        "parameters": [
          {
            "name": "categoryId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.UpdateCategoryStatusRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.UpdateCategoryStatusRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.UpdateCategoryStatusRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "409": {
            "description": "Conflict",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/categories/{categoryId}/status-history": {
      "get": {
        "tags": [
          "AdminCategories"
        ],
        "parameters": [
          {
            "name": "categoryId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Admin.Application.DTOs.CategoryStatusHistoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Admin.Application.DTOs.CategoryStatusHistoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Admin.Application.DTOs.CategoryStatusHistoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/dashboard": {
      "get": {
        "tags": [
          "AdminDashboard"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.DashboardResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.DashboardResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.DashboardResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/dashboard/statistics": {
      "get": {
        "tags": [
          "AdminDashboard"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.AdminDashboardStatisticsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.AdminDashboardStatisticsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.AdminDashboardStatisticsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "500": {
            "description": "Server Error",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/finance/money-flow": {
      "get": {
        "tags": [
          "AdminFinance"
        ],
        "parameters": [
          {
            "name": "fromDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "toDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.MoneyFlowResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.MoneyFlowResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.MoneyFlowResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/payouts/{payoutId}/approve": {
      "post": {
        "tags": [
          "AdminFinance"
        ],
        "parameters": [
          {
            "name": "payoutId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "409": {
            "description": "Conflict",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/payouts/{payoutId}/reject": {
      "post": {
        "tags": [
          "AdminFinance"
        ],
        "parameters": [
          {
            "name": "payoutId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "409": {
            "description": "Conflict",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/orders": {
      "get": {
        "tags": [
          "AdminOrders"
        ],
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "paymentStatus",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "buyerId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "sellerId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "fromDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "toDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "minAmount",
            "in": "query",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "maxAmount",
            "in": "query",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.OrderDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.OrderDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.OrderDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/orders/{orderId}": {
      "get": {
        "tags": [
          "AdminOrders"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.OrderDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.OrderDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.OrderDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/products": {
      "get": {
        "tags": [
          "AdminProducts"
        ],
        "parameters": [
          {
            "name": "searchTerm",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "categoryId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "sellerId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "condition",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "minPrice",
            "in": "query",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "maxPrice",
            "in": "query",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.ProductDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.ProductDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.ProductDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/products/{productId}/approve": {
      "patch": {
        "tags": [
          "AdminProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/products/{productId}/reject": {
      "patch": {
        "tags": [
          "AdminProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.RejectProductRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.RejectProductRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.RejectProductRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/products/{productId}/moderation-history": {
      "get": {
        "tags": [
          "AdminProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Admin.Application.DTOs.ProductModerationHistoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Admin.Application.DTOs.ProductModerationHistoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Admin.Application.DTOs.ProductModerationHistoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/return-requests": {
      "get": {
        "tags": [
          "AdminReturnRequests"
        ],
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "buyerId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "sellerId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "orderId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "fromDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "toDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/return-requests/{id}": {
      "get": {
        "tags": [
          "AdminReturnRequests"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/return-requests/{id}/approve": {
      "patch": {
        "tags": [
          "AdminReturnRequests"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/return-requests/{id}/reject": {
      "patch": {
        "tags": [
          "AdminReturnRequests"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/return-requests/{id}/mark-item-returned": {
      "patch": {
        "tags": [
          "AdminReturnRequests"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/return-requests/{id}/start-refund": {
      "patch": {
        "tags": [
          "AdminReturnRequests"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/return-requests/{id}/complete-refund": {
      "patch": {
        "tags": [
          "AdminReturnRequests"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/return-requests/{id}/close": {
      "patch": {
        "tags": [
          "AdminReturnRequests"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/seller-shops/pending": {
      "get": {
        "tags": [
          "AdminSellerShop"
        ],
        "parameters": [
          {
            "name": "Page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "PageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/seller-shops/{id}": {
      "get": {
        "tags": [
          "AdminSellerShop"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/seller-shops/{id}/approve": {
      "post": {
        "tags": [
          "AdminSellerShop"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/seller-shops/{id}/reject": {
      "post": {
        "tags": [
          "AdminSellerShop"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.RejectSellerShopRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.RejectSellerShopRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.RejectSellerShopRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/users": {
      "get": {
        "tags": [
          "AdminUsers"
        ],
        "parameters": [
          {
            "name": "searchTerm",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.UserDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.UserDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.UserDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/users/{userId}/lock": {
      "patch": {
        "tags": [
          "AdminUsers"
        ],
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/users/{userId}/unlock": {
      "patch": {
        "tags": [
          "AdminUsers"
        ],
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/users/{userId}/status-history": {
      "get": {
        "tags": [
          "AdminUsers"
        ],
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Admin.Application.DTOs.UserStatusHistoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Admin.Application.DTOs.UserStatusHistoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Admin.Application.DTOs.UserStatusHistoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/vouchers": {
      "get": {
        "tags": [
          "AdminVouchers"
        ],
        "parameters": [
          {
            "name": "searchTerm",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "isActive",
            "in": "query",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "AdminVouchers"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.CreateVoucherRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.CreateVoucherRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.CreateVoucherRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/admin/vouchers/{voucherId}": {
      "put": {
        "tags": [
          "AdminVouchers"
        ],
        "parameters": [
          {
            "name": "voucherId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.UpdateVoucherRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.UpdateVoucherRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.UpdateVoucherRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "AdminVouchers"
        ],
        "parameters": [
          {
            "name": "voucherId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/ai/product-price-predict": {
      "post": {
        "tags": [
          "Ai"
        ],
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "Image": {
                    "type": "string",
                    "format": "binary"
                  },
                  "CategoryHint": {
                    "type": "string"
                  },
                  "ProductNameHint": {
                    "type": "string"
                  },
                  "BrandHint": {
                    "type": "string"
                  },
                  "OriginalPrice": {
                    "type": "number",
                    "format": "double"
                  },
                  "Currency": {
                    "type": "string"
                  }
                }
              },
              "encoding": {
                "Image": {
                  "style": "form"
                },
                "CategoryHint": {
                  "style": "form"
                },
                "ProductNameHint": {
                  "style": "form"
                },
                "BrandHint": {
                  "style": "form"
                },
                "OriginalPrice": {
                  "style": "form"
                },
                "Currency": {
                  "style": "form"
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.ProductPricePredictionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.ProductPricePredictionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.ProductPricePredictionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/ai/pricing/predict": {
      "post": {
        "tags": [
          "Ai"
        ],
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "ProductName": {
                    "type": "string"
                  },
                  "CategoryId": {
                    "type": "string",
                    "format": "uuid"
                  },
                  "Condition": {
                    "type": "string"
                  },
                  "Brand": {
                    "type": "string"
                  },
                  "Description": {
                    "type": "string"
                  },
                  "Location": {
                    "type": "string"
                  },
                  "OriginalPrice": {
                    "type": "number",
                    "format": "double"
                  },
                  "Images": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "binary"
                    }
                  },
                  "ImageUrls": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              },
              "encoding": {
                "ProductName": {
                  "style": "form"
                },
                "CategoryId": {
                  "style": "form"
                },
                "Condition": {
                  "style": "form"
                },
                "Brand": {
                  "style": "form"
                },
                "Description": {
                  "style": "form"
                },
                "Location": {
                  "style": "form"
                },
                "OriginalPrice": {
                  "style": "form"
                },
                "Images": {
                  "style": "form"
                },
                "ImageUrls": {
                  "style": "form"
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.PredictProductPriceResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.PredictProductPriceResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.PredictProductPriceResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/ai/recommendations/products": {
      "get": {
        "tags": [
          "Ai"
        ],
        "parameters": [
          {
            "name": "categoryId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 10
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.GetProductRecommendationsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.GetProductRecommendationsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.GetProductRecommendationsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/ai/chatbot/message": {
      "post": {
        "tags": [
          "Ai"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiChatbotMessageRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiChatbotMessageRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiChatbotMessageRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.AiChatbotMessageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.AiChatbotMessageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.AiChatbotMessageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/ai/chat": {
      "post": {
        "tags": [
          "Ai"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiChatRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiChatRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiChatRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.AiChatResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.AiChatResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.AiChatResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "429": {
            "description": "Too Many Requests",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "502": {
            "description": "Server Error",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "503": {
            "description": "Server Error",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/ai/recommendations/similar": {
      "get": {
        "tags": [
          "Ai"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 10
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.GetSimilarProductsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.GetSimilarProductsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.GetSimilarProductsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/ai/sentiment/review": {
      "post": {
        "tags": [
          "Ai"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiSentimentAnalysisRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiSentimentAnalysisRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiSentimentAnalysisRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.AiSentimentAnalysisResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.AiSentimentAnalysisResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.AiSentimentAnalysisResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/register": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.RegisterRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.RegisterRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.RegisterRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.AuthResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.AuthResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.AuthResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/verify-email": {
      "get": {
        "tags": [
          "Auth"
        ],
        "parameters": [
          {
            "name": "Email",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "Token",
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.VerifyEmailRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.VerifyEmailRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.VerifyEmailRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/resend-verification": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.ResendVerificationRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.ResendVerificationRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.ResendVerificationRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/login": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.LoginRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.LoginRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.LoginRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.AuthResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.AuthResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.AuthResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/google-login": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.GoogleLoginRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.GoogleLoginRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.GoogleLoginRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.AuthResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.AuthResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.AuthResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/forgot-password": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.ForgotPasswordRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.ForgotPasswordRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.ForgotPasswordRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/reset-password": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.ResetPasswordRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.ResetPasswordRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.ResetPasswordRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/password": {
      "put": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.UpdatePasswordRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.UpdatePasswordRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.UpdatePasswordRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/logout": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.LogoutRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.LogoutRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Auth.Application.DTOs.LogoutRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/me": {
      "get": {
        "tags": [
          "Auth"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.CurrentUserResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.CurrentUserResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.CurrentUserResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/buyer/orders/{orderId}/shipping/confirm-received": {
      "put": {
        "tags": [
          "BuyerShipping"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Shipping.Application.DTOs.ShippingInfoResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Shipping.Application.DTOs.ShippingInfoResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Shipping.Application.DTOs.ShippingInfoResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/cart": {
      "get": {
        "tags": [
          "Cart"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CartResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CartResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CartResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/cart/items": {
      "post": {
        "tags": [
          "Cart"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.AddCartItemRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.AddCartItemRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.AddCartItemRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CartResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CartResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CartResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/cart/items/{cartItemId}": {
      "put": {
        "tags": [
          "Cart"
        ],
        "parameters": [
          {
            "name": "cartItemId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.UpdateCartItemQuantityRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.UpdateCartItemQuantityRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.UpdateCartItemQuantityRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CartResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CartResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CartResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Cart"
        ],
        "parameters": [
          {
            "name": "cartItemId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "No Content"
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/cart/voucher": {
      "put": {
        "tags": [
          "Cart"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ApplyVoucherRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ApplyVoucherRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ApplyVoucherRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CheckoutSummaryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CheckoutSummaryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CheckoutSummaryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/chats": {
      "get": {
        "tags": [
          "Chats"
        ],
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.ChatListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.ChatListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.ChatListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/chats/threads": {
      "post": {
        "tags": [
          "Chats"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.CreateChatThreadRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.CreateChatThreadRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.CreateChatThreadRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ChatThreadResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ChatThreadResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ChatThreadResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/chats/{chatId}": {
      "get": {
        "tags": [
          "Chats"
        ],
        "parameters": [
          {
            "name": "chatId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 50
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ChatDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ChatDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ChatDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/chats/{chatId}/messages": {
      "post": {
        "tags": [
          "Chats"
        ],
        "parameters": [
          {
            "name": "chatId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.SendMessageRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.SendMessageRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.SendMessageRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ChatMessageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ChatMessageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ChatMessageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/chats/{chatId}/messages/read": {
      "patch": {
        "tags": [
          "Chats"
        ],
        "parameters": [
          {
            "name": "chatId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/checkout/calculate": {
      "get": {
        "tags": [
          "Checkout"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CheckoutSummaryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CheckoutSummaryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CheckoutSummaryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/dev/test-email": {
      "post": {
        "tags": [
          "Dev"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Api.Controllers.TestEmailRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Api.Controllers.TestEmailRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Api.Controllers.TestEmailRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/discovery/homepage": {
      "get": {
        "tags": [
          "Discovery"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Discovery.Application.DTOs.HomepageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Discovery.Application.DTOs.HomepageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Discovery.Application.DTOs.HomepageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/categories": {
      "get": {
        "tags": [
          "Discovery"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Discovery.Application.DTOs.CategoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Discovery.Application.DTOs.CategoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Discovery.Application.DTOs.CategoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/categories/{categoryId}/products": {
      "get": {
        "tags": [
          "Discovery"
        ],
        "parameters": [
          {
            "name": "categoryId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/products/search": {
      "get": {
        "tags": [
          "Discovery"
        ],
        "parameters": [
          {
            "name": "Keyword",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "CategoryId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "MinPrice",
            "in": "query",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "MaxPrice",
            "in": "query",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "Condition",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "Location",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "Sort",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "Page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "PageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/products/compare": {
      "post": {
        "tags": [
          "Discovery"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.ProductComparisonRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.ProductComparisonRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.ProductComparisonRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Discovery.Application.DTOs.ProductComparisonResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Discovery.Application.DTOs.ProductComparisonResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Discovery.Application.DTOs.ProductComparisonResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/products/{productId}": {
      "get": {
        "tags": [
          "Discovery"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Discovery.Application.DTOs.ProductDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Discovery.Application.DTOs.ProductDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Discovery.Application.DTOs.ProductDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/me/viewed-products": {
      "get": {
        "tags": [
          "Discovery"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Discovery.Application.DTOs.ViewedProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Discovery.Application.DTOs.ViewedProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Discovery.Application.DTOs.ViewedProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Discovery"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/followed": {
      "get": {
        "tags": [
          "Follow"
        ],
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.FollowedSellerResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.FollowedSellerResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.FollowedSellerResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/users/me/followed-sellers": {
      "get": {
        "tags": [
          "Follow"
        ],
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.FollowedSellerResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.FollowedSellerResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.FollowedSellerResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/sellers/{sellerId}/follow": {
      "post": {
        "tags": [
          "Follow"
        ],
        "parameters": [
          {
            "name": "sellerId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerFollowStatusResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerFollowStatusResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerFollowStatusResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Follow"
        ],
        "parameters": [
          {
            "name": "sellerId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.UpdateSellerFollowRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.UpdateSellerFollowRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.UpdateSellerFollowRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerFollowStatusResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerFollowStatusResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerFollowStatusResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Follow"
        ],
        "parameters": [
          {
            "name": "sellerId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/sellers/{sellerId}/follow-status": {
      "get": {
        "tags": [
          "Follow"
        ],
        "parameters": [
          {
            "name": "sellerId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerFollowStatusResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerFollowStatusResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerFollowStatusResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/notifications": {
      "get": {
        "tags": [
          "Notifications"
        ],
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.NotificationResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.NotificationResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.NotificationResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/notifications/{notificationId}/read": {
      "patch": {
        "tags": [
          "Notifications"
        ],
        "parameters": [
          {
            "name": "notificationId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/notifications/{notificationId}": {
      "delete": {
        "tags": [
          "Notifications"
        ],
        "parameters": [
          {
            "name": "notificationId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/orders": {
      "post": {
        "tags": [
          "Order"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CreateOrderRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CreateOrderRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CreateOrderRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CreateOrderResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CreateOrderResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CreateOrderResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/orders/purchased": {
      "get": {
        "tags": [
          "Order"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/orders/purchased/paged": {
      "get": {
        "tags": [
          "Order"
        ],
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/orders/{orderId}": {
      "get": {
        "tags": [
          "Order"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Order"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/orders/{orderId}/cancel": {
      "patch": {
        "tags": [
          "Order"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CancelOrderRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CancelOrderRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CancelOrderRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderStatusChangeResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderStatusChangeResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderStatusChangeResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "409": {
            "description": "Conflict",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/orders/{orderId}/confirm-received": {
      "patch": {
        "tags": [
          "Order"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderStatusChangeResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderStatusChangeResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderStatusChangeResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "409": {
            "description": "Conflict",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/orders/split": {
      "post": {
        "tags": [
          "Order"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/payments/transactions": {
      "post": {
        "tags": [
          "Payment"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.CreatePaymentTransactionRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.CreatePaymentTransactionRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.CreatePaymentTransactionRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.PaymentTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.PaymentTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.PaymentTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/payments/orders/{orderId}/transaction": {
      "get": {
        "tags": [
          "Payment"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.PaymentTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.PaymentTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.PaymentTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/payments/webhook/omise": {
      "post": {
        "tags": [
          "Payment"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.OmiseWebhookResult, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.OmiseWebhookResult, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.OmiseWebhookResult, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/payments/webhook/payos": {
      "post": {
        "tags": [
          "Payment"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.PayOSWebhookResult, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.PayOSWebhookResult, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.PayOSWebhookResult, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/payments/payos/verify": {
      "get": {
        "tags": [
          "Payment"
        ],
        "parameters": [
          {
            "name": "orderCode",
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.VerifyPayOSPaymentResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.VerifyPayOSPaymentResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.VerifyPayOSPaymentResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/payments/{paymentTransactionId}/refund": {
      "post": {
        "tags": [
          "Payment"
        ],
        "parameters": [
          {
            "name": "paymentTransactionId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.RefundRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.RefundRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.RefundRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.RefundResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.RefundResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.RefundResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/profile": {
      "get": {
        "tags": [
          "Profile"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.ProfileResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.ProfileResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.ProfileResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Profile"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Profile.Application.DTOs.UpdateProfileRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Profile.Application.DTOs.UpdateProfileRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Profile.Application.DTOs.UpdateProfileRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.ProfileResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.ProfileResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.ProfileResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/orders/{orderId}/return-requests": {
      "post": {
        "tags": [
          "ReturnRequests"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CreateReturnRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CreateReturnRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CreateReturnRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/products/{productId}/reviews": {
      "get": {
        "tags": [
          "Reviews"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "pageNumber",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 10
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ProductReviewsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ProductReviewsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ProductReviewsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Reviews"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.CreateReviewRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.CreateReviewRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.CreateReviewRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/reviews/{reviewId}": {
      "put": {
        "tags": [
          "Reviews"
        ],
        "parameters": [
          {
            "name": "reviewId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.UpdateReviewRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.UpdateReviewRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.UpdateReviewRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Reviews"
        ],
        "parameters": [
          {
            "name": "reviewId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/products/{productId}/reviews/{reviewId}": {
      "put": {
        "tags": [
          "Reviews"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "reviewId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.UpdateReviewRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.UpdateReviewRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.UpdateReviewRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Reviews"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "reviewId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/sellers/{sellerId}/ratings": {
      "post": {
        "tags": [
          "Reviews"
        ],
        "parameters": [
          {
            "name": "sellerId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.CreateSellerRatingRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.CreateSellerRatingRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.CreateSellerRatingRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      },
      "get": {
        "tags": [
          "Reviews"
        ],
        "parameters": [
          {
            "name": "sellerId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "pageNumber",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 10
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerRatingsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerRatingsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerRatingsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/sellers/{sellerId}/rating-summary": {
      "get": {
        "tags": [
          "Reviews"
        ],
        "parameters": [
          {
            "name": "sellerId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerRatingSummaryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerRatingSummaryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerRatingSummaryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/health": {
      "get": {
        "tags": [
          "SECOM.Api"
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/seller/bank-accounts": {
      "get": {
        "tags": [
          "SellerBankAccount"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Payment.Application.DTOs.BankAccountResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Payment.Application.DTOs.BankAccountResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Payment.Application.DTOs.BankAccountResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "SellerBankAccount"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.CreateBankAccountRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.CreateBankAccountRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.CreateBankAccountRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.BankAccountResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.BankAccountResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.BankAccountResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/bank-accounts/{bankAccountId}": {
      "delete": {
        "tags": [
          "SellerBankAccount"
        ],
        "parameters": [
          {
            "name": "bankAccountId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/dashboard": {
      "get": {
        "tags": [
          "SellerDashboard"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerDashboardResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerDashboardResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerDashboardResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/sellers/{sellerId}/statistics": {
      "get": {
        "tags": [
          "SellerDashboard"
        ],
        "parameters": [
          {
            "name": "sellerId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerStatisticsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerStatisticsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerStatisticsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/dashboard/sales-report": {
      "get": {
        "tags": [
          "SellerDashboard"
        ],
        "parameters": [
          {
            "name": "startDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerSalesReportResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerSalesReportResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerSalesReportResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/products/import": {
      "post": {
        "tags": [
          "SellerImport"
        ],
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              },
              "encoding": {
                "file": {
                  "style": "form"
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.ImportSellerProductsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.ImportSellerProductsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.ImportSellerProductsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/orders": {
      "get": {
        "tags": [
          "SellerOrder"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/orders/{orderId}/confirm-packing": {
      "put": {
        "tags": [
          "SellerOrder"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/orders/{orderId}/status": {
      "patch": {
        "tags": [
          "SellerOrder"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.SellerUpdateOrderStatusRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.SellerUpdateOrderStatusRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.SellerUpdateOrderStatusRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderStatusChangeResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderStatusChangeResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderStatusChangeResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "409": {
            "description": "Conflict",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/products": {
      "get": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "Keyword",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "Status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "CategoryId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "Condition",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "Page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "PageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "SellerProducts"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.CreateSellerProductRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.CreateSellerProductRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.CreateSellerProductRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/products/{productId}": {
      "get": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.UpdateSellerProductRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.UpdateSellerProductRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.UpdateSellerProductRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/products/{productId}/inactive": {
      "patch": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/products/{productId}/images": {
      "get": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "Files": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "binary"
                    }
                  },
                  "PrimaryIndex": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "AltTexts": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              },
              "encoding": {
                "Files": {
                  "style": "form"
                },
                "PrimaryIndex": {
                  "style": "form"
                },
                "AltTexts": {
                  "style": "form"
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/products/{productId}/images/metadata": {
      "post": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.AddProductImagesRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/products/{productId}/images/{imageId}/primary": {
      "patch": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "imageId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/products/{productId}/images/{imageId}": {
      "put": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "imageId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.UpdateProductImageRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.UpdateProductImageRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.UpdateProductImageRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "imageId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/products/{productId}/images/order": {
      "put": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.ReorderProductImagesRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.ReorderProductImagesRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.ReorderProductImagesRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/products/{productId}/inventory": {
      "put": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.UpdateInventoryRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.UpdateInventoryRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.UpdateInventoryRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.InventoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.InventoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.InventoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/vouchers": {
      "post": {
        "tags": [
          "SellerProducts"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Voucher.Application.DTOs.CreateSellerVoucherRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Voucher.Application.DTOs.CreateSellerVoucherRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Voucher.Application.DTOs.CreateSellerVoucherRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/vouchers/{voucherId}": {
      "put": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "voucherId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Voucher.Application.DTOs.UpdateSellerVoucherRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Voucher.Application.DTOs.UpdateSellerVoucherRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Voucher.Application.DTOs.UpdateSellerVoucherRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "SellerProducts"
        ],
        "parameters": [
          {
            "name": "voucherId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/orders/{orderId}/shipping": {
      "post": {
        "tags": [
          "SellerShipping"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Shipping.Application.DTOs.CreateShippingInfoRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Shipping.Application.DTOs.CreateShippingInfoRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Shipping.Application.DTOs.CreateShippingInfoRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Shipping.Application.DTOs.ShippingInfoResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Shipping.Application.DTOs.ShippingInfoResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Shipping.Application.DTOs.ShippingInfoResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/orders/{orderId}/shipping/tracking-code": {
      "put": {
        "tags": [
          "SellerShipping"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Shipping.Application.DTOs.UpdateTrackingCodeRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Shipping.Application.DTOs.UpdateTrackingCodeRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Shipping.Application.DTOs.UpdateTrackingCodeRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Shipping.Application.DTOs.ShippingInfoResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Shipping.Application.DTOs.ShippingInfoResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Shipping.Application.DTOs.ShippingInfoResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/shop/register": {
      "post": {
        "tags": [
          "SellerShop"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.RegisterSellerShopRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.RegisterSellerShopRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.RegisterSellerShopRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "409": {
            "description": "Conflict",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/shop/status": {
      "get": {
        "tags": [
          "SellerShop"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/wallet": {
      "get": {
        "tags": [
          "SellerWallet"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.SellerWalletResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.SellerWalletResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.SellerWalletResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/wallet/transactions": {
      "get": {
        "tags": [
          "SellerWallet"
        ],
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Payment.Application.DTOs.WalletTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Payment.Application.DTOs.WalletTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Payment.Application.DTOs.WalletTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/seller/withdrawals": {
      "post": {
        "tags": [
          "SellerWithdrawal"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.CreateWithdrawalRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.CreateWithdrawalRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.CreateWithdrawalRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.WithdrawalResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.WithdrawalResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.WithdrawalResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/vouchers": {
      "get": {
        "tags": [
          "Voucher"
        ],
        "parameters": [
          {
            "name": "keyword",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "discountType",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "sortBy",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Voucher"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Voucher.Application.DTOs.CreateAdminVoucherRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Voucher.Application.DTOs.CreateAdminVoucherRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SECOM.Modules.Voucher.Application.DTOs.CreateAdminVoucherRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/vouchers/{voucherId}": {
      "get": {
        "tags": [
          "Voucher"
        ],
        "parameters": [
          {
            "name": "voucherId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/vouchers/{voucherId}/collect": {
      "post": {
        "tags": [
          "Voucher"
        ],
        "parameters": [
          {
            "name": "voucherId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/me/vouchers": {
      "get": {
        "tags": [
          "Voucher"
        ],
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "sortBy",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Voucher.Application.DTOs.CollectedVoucherResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Voucher.Application.DTOs.CollectedVoucherResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Voucher.Application.DTOs.CollectedVoucherResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/wishlist": {
      "get": {
        "tags": [
          "Wishlist"
        ],
        "parameters": [
          {
            "name": "pageNumber",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 10
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.WishlistPagedResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.WishlistPagedResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.WishlistPagedResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
                }
              }
            }
          }
        }
      }
    },
    "/api/wishlist/{productId}": {
      "post": {
        "tags": [
          "Wishlist"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Wishlist"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "SECOM.Api.Controllers.TestEmailRequest": {
        "type": "object",
        "properties": {
          "to": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.AI.Application.DTOs.AiChatHistoryItemRequest": {
        "type": "object",
        "properties": {
          "role": {
            "type": "string",
            "nullable": true
          },
          "content": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.AI.Application.DTOs.AiChatRequest": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "nullable": true
          },
          "history": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiChatHistoryItemRequest"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.AI.Application.DTOs.AiChatResponse": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "nullable": true
          },
          "model": {
            "type": "string",
            "nullable": true
          },
          "generatedAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.AI.Application.DTOs.AiChatbotMessageRequest": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.AI.Application.DTOs.AiChatbotMessageResponse": {
        "type": "object",
        "properties": {
          "reply": {
            "type": "string",
            "nullable": true
          },
          "suggestedActions": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.AI.Application.DTOs.AiSentimentAnalysisRequest": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.AI.Application.DTOs.AiSentimentAnalysisResponse": {
        "type": "object",
        "properties": {
          "label": {
            "type": "string",
            "nullable": true
          },
          "score": {
            "type": "number",
            "format": "double"
          },
          "confidence": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.AI.Application.DTOs.GetProductRecommendationsResponse": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.ProductRecommendationResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.AI.Application.DTOs.GetSimilarProductsResponse": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.ProductRecommendationResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.AI.Application.DTOs.PredictProductPriceResponse": {
        "type": "object",
        "properties": {
          "suggestedPrice": {
            "type": "number",
            "format": "double"
          },
          "minPrice": {
            "type": "number",
            "format": "double"
          },
          "maxPrice": {
            "type": "number",
            "format": "double"
          },
          "confidenceScore": {
            "type": "number",
            "format": "double"
          },
          "imageAnalysis": {
            "type": "string",
            "nullable": true
          },
          "explanation": {
            "type": "string",
            "nullable": true
          },
          "warnings": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.AI.Application.DTOs.ProductPricePredictionResponse": {
        "type": "object",
        "properties": {
          "productName": {
            "type": "string",
            "nullable": true
          },
          "category": {
            "type": "string",
            "nullable": true
          },
          "brand": {
            "type": "string",
            "nullable": true
          },
          "model": {
            "type": "string",
            "nullable": true
          },
          "condition": {
            "type": "string",
            "nullable": true
          },
          "visibleIssues": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          },
          "estimatedPriceMin": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "estimatedPriceMax": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "currency": {
            "type": "string",
            "nullable": true
          },
          "confidence": {
            "type": "number",
            "format": "double"
          },
          "reason": {
            "type": "string",
            "nullable": true
          },
          "warnings": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.AI.Application.DTOs.ProductRecommendationResponse": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "productName": {
            "type": "string",
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double"
          },
          "condition": {
            "type": "string",
            "nullable": true
          },
          "brand": {
            "type": "string",
            "nullable": true
          },
          "location": {
            "type": "string",
            "nullable": true
          },
          "sellerName": {
            "type": "string",
            "nullable": true
          },
          "thumbnailUrl": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.AdminDashboardStatisticsResponse": {
        "type": "object",
        "properties": {
          "overview": {
            "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.DashboardOverviewResponse"
          },
          "products": {
            "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.ProductStatisticsResponse"
          },
          "orders": {
            "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.OrderBreakdownResponse"
          },
          "financials": {
            "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.FinancialAdjustmentsResponse"
          },
          "generatedAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.CategoryDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "slug": {
            "type": "string",
            "nullable": true
          },
          "isActive": {
            "type": "boolean"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.CategoryStatusHistoryResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "categoryId": {
            "type": "string",
            "format": "uuid"
          },
          "previousIsActive": {
            "type": "boolean"
          },
          "newIsActive": {
            "type": "boolean"
          },
          "reason": {
            "type": "string",
            "nullable": true
          },
          "adminId": {
            "type": "string",
            "format": "uuid"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.CreateCategoryRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "slug": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.CreateVoucherRequest": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string",
            "nullable": true
          },
          "discountType": {
            "type": "string",
            "nullable": true
          },
          "discountValue": {
            "type": "number",
            "format": "double"
          },
          "minOrderAmount": {
            "type": "number",
            "format": "double"
          },
          "expiresAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "usageLimit": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "isActive": {
            "type": "boolean",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.CustomerInsightDto": {
        "type": "object",
        "properties": {
          "customerId": {
            "type": "string",
            "format": "uuid"
          },
          "fullName": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "purchaseFrequency": {
            "type": "integer",
            "format": "int32"
          },
          "totalSpending": {
            "type": "number",
            "format": "double"
          },
          "lastPurchaseDate": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "isChurnRisk": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.CustomerInsightsResponse": {
        "type": "object",
        "properties": {
          "totalCustomers": {
            "type": "integer",
            "format": "int32"
          },
          "activeCustomers": {
            "type": "integer",
            "format": "int32"
          },
          "churnRiskCustomers": {
            "type": "integer",
            "format": "int32"
          },
          "customers": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.CustomerInsightDto"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.DashboardOverviewResponse": {
        "type": "object",
        "properties": {
          "totalRevenue": {
            "type": "number",
            "format": "double"
          },
          "revenueGrowthPercentage": {
            "type": "number",
            "format": "double"
          },
          "totalOrders": {
            "type": "integer",
            "format": "int32"
          },
          "orderGrowthPercentage": {
            "type": "number",
            "format": "double"
          },
          "totalUsers": {
            "type": "integer",
            "format": "int32"
          },
          "totalBuyers": {
            "type": "integer",
            "format": "int32"
          },
          "userGrowthPercentage": {
            "type": "number",
            "format": "double"
          },
          "activeSellers": {
            "type": "integer",
            "format": "int32"
          },
          "sellerGrowthPercentage": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.DashboardResponse": {
        "type": "object",
        "properties": {
          "totalUsers": {
            "type": "integer",
            "format": "int32"
          },
          "totalBuyers": {
            "type": "integer",
            "format": "int32"
          },
          "totalSellers": {
            "type": "integer",
            "format": "int32"
          },
          "totalProducts": {
            "type": "integer",
            "format": "int32"
          },
          "pendingProducts": {
            "type": "integer",
            "format": "int32"
          },
          "approvedProducts": {
            "type": "integer",
            "format": "int32"
          },
          "rejectedProducts": {
            "type": "integer",
            "format": "int32"
          },
          "totalOrders": {
            "type": "integer",
            "format": "int32"
          },
          "completedOrders": {
            "type": "integer",
            "format": "int32"
          },
          "cancelledOrders": {
            "type": "integer",
            "format": "int32"
          },
          "totalRevenue": {
            "type": "number",
            "format": "double"
          },
          "totalRefundAmount": {
            "type": "number",
            "format": "double"
          },
          "totalSellerPayoutAmount": {
            "type": "number",
            "format": "double"
          },
          "totalWithdrawalAmount": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.FinancialAdjustmentsResponse": {
        "type": "object",
        "properties": {
          "totalRefund": {
            "type": "number",
            "format": "double"
          },
          "sellerPayout": {
            "type": "number",
            "format": "double"
          },
          "withdrawalAmount": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.MoneyFlowResponse": {
        "type": "object",
        "properties": {
          "totalGMV": {
            "type": "number",
            "format": "double"
          },
          "totalPlatformRevenue": {
            "type": "number",
            "format": "double"
          },
          "totalPlatformFee": {
            "type": "number",
            "format": "double"
          },
          "totalRefundAmount": {
            "type": "number",
            "format": "double"
          },
          "totalSellerPayoutAmount": {
            "type": "number",
            "format": "double"
          },
          "totalPendingWithdrawalAmount": {
            "type": "number",
            "format": "double"
          },
          "totalCompletedWithdrawalAmount": {
            "type": "number",
            "format": "double"
          },
          "totalFailedWithdrawalAmount": {
            "type": "number",
            "format": "double"
          },
          "netRevenue": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.OrderBreakdownResponse": {
        "type": "object",
        "properties": {
          "completedOrders": {
            "type": "integer",
            "format": "int32"
          },
          "cancelledOrders": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.OrderDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "buyerId": {
            "type": "string",
            "format": "uuid"
          },
          "buyerFullName": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "type": "string",
            "nullable": true
          },
          "subtotal": {
            "type": "number",
            "format": "double"
          },
          "shippingFee": {
            "type": "number",
            "format": "double"
          },
          "serviceFee": {
            "type": "number",
            "format": "double"
          },
          "discountAmount": {
            "type": "number",
            "format": "double"
          },
          "finalTotal": {
            "type": "number",
            "format": "double"
          },
          "voucherCode": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "cancelledAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.ProductDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double"
          },
          "condition": {
            "type": "string",
            "nullable": true
          },
          "location": {
            "type": "string",
            "nullable": true
          },
          "isActive": {
            "type": "boolean"
          },
          "isPublic": {
            "type": "boolean"
          },
          "isApproved": {
            "type": "boolean"
          },
          "isRejected": {
            "type": "boolean"
          },
          "viewCount": {
            "type": "integer",
            "format": "int32"
          },
          "categoryId": {
            "type": "string",
            "format": "uuid"
          },
          "categoryName": {
            "type": "string",
            "nullable": true
          },
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "sellerFullName": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.ProductModerationHistoryResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "action": {
            "type": "string",
            "nullable": true
          },
          "previousStatus": {
            "type": "string",
            "nullable": true
          },
          "newStatus": {
            "type": "string",
            "nullable": true
          },
          "reason": {
            "type": "string",
            "nullable": true
          },
          "adminId": {
            "type": "string",
            "format": "uuid"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.ProductStatisticsResponse": {
        "type": "object",
        "properties": {
          "totalProducts": {
            "type": "integer",
            "format": "int32"
          },
          "pendingProducts": {
            "type": "integer",
            "format": "int32"
          },
          "approvedProducts": {
            "type": "integer",
            "format": "int32"
          },
          "rejectedProducts": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.RejectProductRequest": {
        "type": "object",
        "properties": {
          "reason": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.UpdateCategoryRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "slug": {
            "type": "string",
            "nullable": true
          },
          "isActive": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.UpdateCategoryStatusRequest": {
        "type": "object",
        "properties": {
          "isActive": {
            "type": "boolean"
          },
          "reason": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.UpdateVoucherRequest": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string",
            "nullable": true
          },
          "discountType": {
            "type": "string",
            "nullable": true
          },
          "discountValue": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "minOrderAmount": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "expiresAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "usageLimit": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "isActive": {
            "type": "boolean",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.UserDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "fullName": {
            "type": "string",
            "nullable": true
          },
          "phoneNumber": {
            "type": "string",
            "nullable": true
          },
          "isActive": {
            "type": "boolean"
          },
          "isEmailVerified": {
            "type": "boolean"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "role": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.UserStatusHistoryResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "previousIsActive": {
            "type": "boolean"
          },
          "newIsActive": {
            "type": "boolean"
          },
          "adminId": {
            "type": "string",
            "format": "uuid"
          },
          "action": {
            "type": "string",
            "nullable": true
          },
          "reason": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Admin.Application.DTOs.VoucherDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "code": {
            "type": "string",
            "nullable": true
          },
          "isActive": {
            "type": "boolean"
          },
          "discountType": {
            "type": "string",
            "nullable": true
          },
          "discountValue": {
            "type": "number",
            "format": "double"
          },
          "minOrderAmount": {
            "type": "number",
            "format": "double"
          },
          "expiresAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "usageLimit": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "usedCount": {
            "type": "integer",
            "format": "int32"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Auth.Application.DTOs.ForgotPasswordRequest": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Auth.Application.DTOs.GoogleLoginRequest": {
        "type": "object",
        "properties": {
          "idToken": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Auth.Application.DTOs.LoginRequest": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "nullable": true
          },
          "password": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Auth.Application.DTOs.LogoutRequest": {
        "type": "object",
        "properties": {
          "refreshToken": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Auth.Application.DTOs.RegisterRequest": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "nullable": true
          },
          "password": {
            "type": "string",
            "nullable": true
          },
          "fullName": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Auth.Application.DTOs.ResendVerificationRequest": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Auth.Application.DTOs.ResetPasswordRequest": {
        "type": "object",
        "properties": {
          "token": {
            "type": "string",
            "nullable": true
          },
          "newPassword": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Auth.Application.DTOs.UpdatePasswordRequest": {
        "type": "object",
        "properties": {
          "currentPassword": {
            "type": "string",
            "nullable": true
          },
          "newPassword": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Auth.Application.DTOs.VerifyEmailRequest": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "nullable": true
          },
          "token": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Discovery.Application.DTOs.CategoryResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "slug": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Discovery.Application.DTOs.HomepageBannerResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "imageUrl": {
            "type": "string",
            "nullable": true
          },
          "linkUrl": {
            "type": "string",
            "nullable": true
          },
          "displayOrder": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Discovery.Application.DTOs.HomepageResponse": {
        "type": "object",
        "properties": {
          "banners": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.HomepageBannerResponse"
            },
            "nullable": true
          },
          "featuredCategories": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.CategoryResponse"
            },
            "nullable": true
          },
          "featuredProducts": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse"
            },
            "nullable": true
          },
          "latestProducts": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Discovery.Application.DTOs.ProductComparisonItemResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double"
          },
          "condition": {
            "type": "string",
            "nullable": true
          },
          "location": {
            "type": "string",
            "nullable": true
          },
          "stockQuantity": {
            "type": "integer",
            "format": "int32"
          },
          "categoryName": {
            "type": "string",
            "nullable": true
          },
          "sellerName": {
            "type": "string",
            "nullable": true
          },
          "primaryImageUrl": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Discovery.Application.DTOs.ProductComparisonRequest": {
        "type": "object",
        "properties": {
          "productIds": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Discovery.Application.DTOs.ProductComparisonResponse": {
        "type": "object",
        "properties": {
          "products": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.ProductComparisonItemResponse"
            },
            "nullable": true
          },
          "missingProductIds": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Discovery.Application.DTOs.ProductDetailResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double"
          },
          "condition": {
            "type": "string",
            "nullable": true
          },
          "location": {
            "type": "string",
            "nullable": true
          },
          "category": {
            "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.CategoryResponse"
          },
          "seller": {
            "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.SellerPublicResponse"
          },
          "primaryImageUrl": {
            "type": "string",
            "nullable": true
          },
          "images": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.ProductImageResponse"
            },
            "nullable": true
          },
          "relatedProducts": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Discovery.Application.DTOs.ProductImageResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "imageUrl": {
            "type": "string",
            "nullable": true
          },
          "altText": {
            "type": "string",
            "nullable": true
          },
          "isPrimary": {
            "type": "boolean"
          },
          "displayOrder": {
            "type": "integer",
            "format": "int32"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double"
          },
          "condition": {
            "type": "string",
            "nullable": true
          },
          "location": {
            "type": "string",
            "nullable": true
          },
          "primaryImageUrl": {
            "type": "string",
            "nullable": true
          },
          "categoryId": {
            "type": "string",
            "format": "uuid"
          },
          "categoryName": {
            "type": "string",
            "nullable": true
          },
          "viewCount": {
            "type": "integer",
            "format": "int32"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Discovery.Application.DTOs.SellerPublicResponse": {
        "type": "object",
        "properties": {
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "fullName": {
            "type": "string",
            "nullable": true
          },
          "avatarUrl": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Discovery.Application.DTOs.ViewedProductResponse": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double"
          },
          "primaryImageUrl": {
            "type": "string",
            "nullable": true
          },
          "viewedAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.ChatDetailResponse": {
        "type": "object",
        "properties": {
          "chatId": {
            "type": "string",
            "format": "uuid"
          },
          "messages": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.ChatMessageResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.ChatListItemResponse": {
        "type": "object",
        "properties": {
          "chatId": {
            "type": "string",
            "format": "uuid"
          },
          "buyerId": {
            "type": "string",
            "format": "uuid"
          },
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "productId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "latestMessagePreview": {
            "type": "string",
            "nullable": true
          },
          "latestMessageAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "unreadCount": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.ChatMessageResponse": {
        "type": "object",
        "properties": {
          "messageId": {
            "type": "string",
            "format": "uuid"
          },
          "chatId": {
            "type": "string",
            "format": "uuid"
          },
          "senderId": {
            "type": "string",
            "format": "uuid"
          },
          "recipientId": {
            "type": "string",
            "format": "uuid"
          },
          "content": {
            "type": "string",
            "nullable": true
          },
          "isRead": {
            "type": "boolean"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.ChatThreadResponse": {
        "type": "object",
        "properties": {
          "chatId": {
            "type": "string",
            "format": "uuid"
          },
          "buyerId": {
            "type": "string",
            "format": "uuid"
          },
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "sellerName": {
            "type": "string",
            "nullable": true
          },
          "sellerAvatarUrl": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "lastMessageAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "isExisting": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.CreateChatThreadRequest": {
        "type": "object",
        "properties": {
          "sellerId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.CreateReviewRequest": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "rating": {
            "type": "integer",
            "format": "int32"
          },
          "comment": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.CreateSellerRatingRequest": {
        "type": "object",
        "properties": {
          "orderId": {
            "type": "string",
            "format": "uuid"
          },
          "rating": {
            "type": "integer",
            "format": "int32"
          },
          "comment": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.FollowedSellerResponse": {
        "type": "object",
        "properties": {
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "shopName": {
            "type": "string",
            "nullable": true
          },
          "logoUrl": {
            "type": "string",
            "nullable": true
          },
          "rating": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "followedAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.NotificationResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "type": {
            "type": "string",
            "nullable": true
          },
          "referenceId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "referenceType": {
            "type": "string",
            "nullable": true
          },
          "isRead": {
            "type": "boolean"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.ProductReviewItemResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "buyerId": {
            "type": "string",
            "format": "uuid"
          },
          "reviewerName": {
            "type": "string",
            "nullable": true
          },
          "reviewerAvatarUrl": {
            "type": "string",
            "nullable": true
          },
          "rating": {
            "type": "integer",
            "format": "int32"
          },
          "content": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "isVerifiedPurchase": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.ProductReviewsResponse": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "averageRating": {
            "type": "number",
            "format": "double"
          },
          "totalReviews": {
            "type": "integer",
            "format": "int32"
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.ProductReviewItemResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.SellerFollowStatusResponse": {
        "type": "object",
        "properties": {
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "isFollowing": {
            "type": "boolean"
          },
          "followedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.SellerRatingItemResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "buyerId": {
            "type": "string",
            "format": "uuid"
          },
          "orderId": {
            "type": "string",
            "format": "uuid"
          },
          "buyerName": {
            "type": "string",
            "nullable": true
          },
          "buyerAvatarUrl": {
            "type": "string",
            "nullable": true
          },
          "rating": {
            "type": "integer",
            "format": "int32"
          },
          "comment": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.SellerRatingSummaryResponse": {
        "type": "object",
        "properties": {
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "averageRating": {
            "type": "number",
            "format": "double"
          },
          "totalRatings": {
            "type": "integer",
            "format": "int32"
          },
          "distribution": {
            "type": "object",
            "additionalProperties": {
              "type": "integer",
              "format": "int32"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.SellerRatingsResponse": {
        "type": "object",
        "properties": {
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "averageRating": {
            "type": "number",
            "format": "double"
          },
          "totalRatings": {
            "type": "integer",
            "format": "int32"
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.SellerRatingItemResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.SendMessageRequest": {
        "type": "object",
        "properties": {
          "content": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.UpdateReviewRequest": {
        "type": "object",
        "properties": {
          "rating": {
            "type": "integer",
            "format": "int32"
          },
          "comment": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.UpdateSellerFollowRequest": {
        "type": "object",
        "properties": {
          "isFollowing": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.WishlistItemDto": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "productName": {
            "type": "string",
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Engagement.Application.DTOs.WishlistPagedResponse": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.WishlistItemDto"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.AddCartItemRequest": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "quantity": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.ApplyVoucherRequest": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.CancelOrderRequest": {
        "type": "object",
        "properties": {
          "reason": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.CartItemResponse": {
        "type": "object",
        "properties": {
          "cartItemId": {
            "type": "string",
            "format": "uuid"
          },
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "productName": {
            "type": "string",
            "nullable": true
          },
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "unitPrice": {
            "type": "number",
            "format": "double"
          },
          "quantity": {
            "type": "integer",
            "format": "int32"
          },
          "subtotal": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.CartResponse": {
        "type": "object",
        "properties": {
          "cartId": {
            "type": "string",
            "format": "uuid"
          },
          "voucherCode": {
            "type": "string",
            "nullable": true
          },
          "subtotal": {
            "type": "number",
            "format": "double"
          },
          "discountAmount": {
            "type": "number",
            "format": "double"
          },
          "finalTotal": {
            "type": "number",
            "format": "double"
          },
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CartItemResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.CheckoutSummaryResponse": {
        "type": "object",
        "properties": {
          "subtotal": {
            "type": "number",
            "format": "double"
          },
          "shippingFee": {
            "type": "number",
            "format": "double"
          },
          "serviceFee": {
            "type": "number",
            "format": "double"
          },
          "discountAmount": {
            "type": "number",
            "format": "double"
          },
          "finalTotal": {
            "type": "number",
            "format": "double"
          },
          "voucherCode": {
            "type": "string",
            "nullable": true
          },
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CartItemResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.CreateOrderRequest": {
        "type": "object",
        "properties": {
          "cartItemIds": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.CreateOrderResponse": {
        "type": "object",
        "properties": {
          "order": {
            "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.OrderDetailResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.CreateReturnEvidenceImage": {
        "type": "object",
        "properties": {
          "imageUrl": {
            "type": "string",
            "nullable": true
          },
          "publicId": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.CreateReturnRequest": {
        "type": "object",
        "properties": {
          "reasonCode": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CreateReturnRequestItem"
            },
            "nullable": true
          },
          "evidenceImages": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CreateReturnEvidenceImage"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.CreateReturnRequestItem": {
        "type": "object",
        "properties": {
          "orderItemId": {
            "type": "string",
            "format": "uuid"
          },
          "quantity": {
            "type": "integer",
            "format": "int32"
          },
          "reason": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.OrderDetailResponse": {
        "type": "object",
        "properties": {
          "orderId": {
            "type": "string",
            "format": "uuid"
          },
          "buyerId": {
            "type": "string",
            "format": "uuid"
          },
          "status": {
            "type": "string",
            "nullable": true
          },
          "subtotal": {
            "type": "number",
            "format": "double"
          },
          "shippingFee": {
            "type": "number",
            "format": "double"
          },
          "serviceFee": {
            "type": "number",
            "format": "double"
          },
          "discountAmount": {
            "type": "number",
            "format": "double"
          },
          "finalTotal": {
            "type": "number",
            "format": "double"
          },
          "voucherCode": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.OrderItemResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.OrderItemResponse": {
        "type": "object",
        "properties": {
          "orderItemId": {
            "type": "string",
            "format": "uuid"
          },
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "productName": {
            "type": "string",
            "nullable": true
          },
          "productImageUrl": {
            "type": "string",
            "nullable": true
          },
          "quantity": {
            "type": "integer",
            "format": "int32"
          },
          "unitPrice": {
            "type": "number",
            "format": "double"
          },
          "subtotal": {
            "type": "number",
            "format": "double"
          },
          "status": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.OrderItemSummaryResponse": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "productName": {
            "type": "string",
            "nullable": true
          },
          "productImageUrl": {
            "type": "string",
            "nullable": true
          },
          "quantity": {
            "type": "integer",
            "format": "int32"
          },
          "unitPrice": {
            "type": "number",
            "format": "double"
          },
          "subtotal": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.OrderListItemResponse": {
        "type": "object",
        "properties": {
          "orderId": {
            "type": "string",
            "format": "uuid"
          },
          "status": {
            "type": "string",
            "nullable": true
          },
          "finalTotal": {
            "type": "number",
            "format": "double"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.OrderItemSummaryResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.OrderStatusChangeResponse": {
        "type": "object",
        "properties": {
          "orderId": {
            "type": "string",
            "format": "uuid"
          },
          "previousStatus": {
            "type": "string",
            "nullable": true
          },
          "currentStatus": {
            "type": "string",
            "nullable": true
          },
          "updatedAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.ReturnEvidenceResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "imageUrl": {
            "type": "string",
            "nullable": true
          },
          "publicId": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.ReturnHistoryResponse": {
        "type": "object",
        "properties": {
          "oldStatus": {
            "type": "string",
            "nullable": true
          },
          "newStatus": {
            "type": "string",
            "nullable": true
          },
          "changedByUserId": {
            "type": "string",
            "format": "uuid"
          },
          "reason": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.ReturnRequestItemResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "orderItemId": {
            "type": "string",
            "format": "uuid"
          },
          "productName": {
            "type": "string",
            "nullable": true
          },
          "quantity": {
            "type": "integer",
            "format": "int32"
          },
          "unitPrice": {
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "type": "number",
            "format": "double"
          },
          "reason": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "orderId": {
            "type": "string",
            "format": "uuid"
          },
          "buyerId": {
            "type": "string",
            "format": "uuid"
          },
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "reasonCode": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "type": "string",
            "nullable": true
          },
          "refundAmount": {
            "type": "number",
            "format": "double"
          },
          "requestedAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "reviewedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "reviewedByAdminId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "rejectReason": {
            "type": "string",
            "nullable": true
          },
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReturnRequestItemResponse"
            },
            "nullable": true
          },
          "evidenceImages": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReturnEvidenceResponse"
            },
            "nullable": true
          },
          "histories": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReturnHistoryResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.ReviewReturnRequest": {
        "type": "object",
        "properties": {
          "note": {
            "type": "string",
            "nullable": true
          },
          "reason": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.SellerUpdateOrderStatusRequest": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Order.Application.DTOs.UpdateCartItemQuantityRequest": {
        "type": "object",
        "properties": {
          "quantity": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.BankAccountResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "bankName": {
            "type": "string",
            "nullable": true
          },
          "accountNumberMasked": {
            "type": "string",
            "nullable": true
          },
          "accountHolderName": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.CreateBankAccountRequest": {
        "type": "object",
        "properties": {
          "bankName": {
            "type": "string",
            "nullable": true
          },
          "accountNumber": {
            "type": "string",
            "nullable": true
          },
          "accountHolderName": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.CreatePaymentTransactionRequest": {
        "type": "object",
        "properties": {
          "orderId": {
            "type": "string",
            "format": "uuid"
          },
          "amount": {
            "type": "number",
            "format": "double"
          },
          "currency": {
            "type": "string",
            "nullable": true
          },
          "returnUri": {
            "type": "string",
            "nullable": true
          },
          "cancelUri": {
            "type": "string",
            "nullable": true
          },
          "tokenId": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.CreateWithdrawalRequest": {
        "type": "object",
        "properties": {
          "bankAccountId": {
            "type": "string",
            "format": "uuid"
          },
          "amount": {
            "type": "number",
            "format": "double"
          },
          "reason": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.OmiseWebhookResult": {
        "type": "object",
        "properties": {
          "processed": {
            "type": "boolean"
          },
          "status": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.PayOSWebhookResult": {
        "type": "object",
        "properties": {
          "processed": {
            "type": "boolean"
          },
          "status": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.PaymentTransactionResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "orderId": {
            "type": "string",
            "format": "uuid"
          },
          "buyerId": {
            "type": "string",
            "format": "uuid"
          },
          "amount": {
            "type": "number",
            "format": "double"
          },
          "currency": {
            "type": "string",
            "nullable": true
          },
          "gateway": {
            "type": "string",
            "nullable": true
          },
          "gatewayTransactionId": {
            "type": "string",
            "nullable": true
          },
          "paymentUrl": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.RefundRequest": {
        "type": "object",
        "properties": {
          "amount": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "reason": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.RefundResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "paymentTransactionId": {
            "type": "string",
            "format": "uuid"
          },
          "gatewayRefundId": {
            "type": "string",
            "nullable": true
          },
          "amount": {
            "type": "number",
            "format": "double"
          },
          "status": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.SellerWalletResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "availableBalance": {
            "type": "number",
            "format": "double"
          },
          "pendingBalance": {
            "type": "number",
            "format": "double"
          },
          "withdrawnBalance": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.VerifyPayOSPaymentResponse": {
        "type": "object",
        "properties": {
          "orderId": {
            "type": "string",
            "format": "uuid"
          },
          "orderCode": {
            "type": "string",
            "nullable": true
          },
          "paymentLinkId": {
            "type": "string",
            "nullable": true
          },
          "paymentStatus": {
            "type": "string",
            "nullable": true
          },
          "orderStatus": {
            "type": "string",
            "nullable": true
          },
          "paidAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "isPaid": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.WalletTransactionResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "amount": {
            "type": "number",
            "format": "double"
          },
          "type": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Payment.Application.DTOs.WithdrawalResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "bankAccountId": {
            "type": "string",
            "format": "uuid"
          },
          "amount": {
            "type": "number",
            "format": "double"
          },
          "status": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Profile.Application.DTOs.AddressResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "receiverName": {
            "type": "string",
            "nullable": true
          },
          "phoneNumber": {
            "type": "string",
            "nullable": true
          },
          "province": {
            "type": "string",
            "nullable": true
          },
          "district": {
            "type": "string",
            "nullable": true
          },
          "ward": {
            "type": "string",
            "nullable": true
          },
          "detailAddress": {
            "type": "string",
            "nullable": true
          },
          "isDefault": {
            "type": "boolean"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Profile.Application.DTOs.CreateAddressRequest": {
        "type": "object",
        "properties": {
          "receiverName": {
            "type": "string",
            "nullable": true
          },
          "phoneNumber": {
            "type": "string",
            "nullable": true
          },
          "province": {
            "type": "string",
            "nullable": true
          },
          "district": {
            "type": "string",
            "nullable": true
          },
          "ward": {
            "type": "string",
            "nullable": true
          },
          "detailAddress": {
            "type": "string",
            "nullable": true
          },
          "isDefault": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Profile.Application.DTOs.ProfileResponse": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "fullName": {
            "type": "string",
            "nullable": true
          },
          "phoneNumber": {
            "type": "string",
            "nullable": true
          },
          "avatarUrl": {
            "type": "string",
            "nullable": true
          },
          "isEmailVerified": {
            "type": "boolean"
          },
          "emailVerifiedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Profile.Application.DTOs.UpdateAddressRequest": {
        "type": "object",
        "properties": {
          "receiverName": {
            "type": "string",
            "nullable": true
          },
          "phoneNumber": {
            "type": "string",
            "nullable": true
          },
          "province": {
            "type": "string",
            "nullable": true
          },
          "district": {
            "type": "string",
            "nullable": true
          },
          "ward": {
            "type": "string",
            "nullable": true
          },
          "detailAddress": {
            "type": "string",
            "nullable": true
          },
          "isDefault": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Profile.Application.DTOs.UpdateProfileRequest": {
        "type": "object",
        "properties": {
          "fullName": {
            "type": "string",
            "nullable": true
          },
          "phoneNumber": {
            "type": "string",
            "nullable": true
          },
          "avatarUrl": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.AddProductImagesRequest": {
        "type": "object",
        "properties": {
          "images": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.ProductImageRequest"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "shopName": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "phoneNumber": {
            "type": "string",
            "nullable": true
          },
          "address": {
            "type": "string",
            "nullable": true
          },
          "verificationImageUrl": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Domain.Enums.SellerShopStatus"
          },
          "statusText": {
            "type": "string",
            "nullable": true
          },
          "submittedAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "approvedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "rejectedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "rejectionReason": {
            "type": "string",
            "nullable": true
          },
          "userEmail": {
            "type": "string",
            "nullable": true
          },
          "userFullName": {
            "type": "string",
            "nullable": true
          },
          "approvedByAdminId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "rejectedByAdminId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.CreateSellerProductRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double"
          },
          "categoryId": {
            "type": "string",
            "format": "uuid"
          },
          "condition": {
            "type": "string",
            "nullable": true
          },
          "location": {
            "type": "string",
            "nullable": true
          },
          "isPublic": {
            "type": "boolean"
          },
          "images": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.ProductImageRequest"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.ImportSellerProductsResponse": {
        "type": "object",
        "properties": {
          "totalRows": {
            "type": "integer",
            "format": "int32"
          },
          "successRows": {
            "type": "integer",
            "format": "int32"
          },
          "failedRows": {
            "type": "integer",
            "format": "int32"
          },
          "errors": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.ImportValidationError"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.ImportValidationError": {
        "type": "object",
        "properties": {
          "rowNumber": {
            "type": "integer",
            "format": "int32"
          },
          "field": {
            "type": "string",
            "nullable": true
          },
          "message": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.InventoryResponse": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "stockQuantity": {
            "type": "integer",
            "format": "int32"
          },
          "lowStockThreshold": {
            "type": "integer",
            "format": "int32"
          },
          "isLowStock": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.ProductImageRequest": {
        "type": "object",
        "properties": {
          "imageUrl": {
            "type": "string",
            "nullable": true
          },
          "publicId": {
            "type": "string",
            "nullable": true
          },
          "isPrimary": {
            "type": "boolean"
          },
          "displayOrder": {
            "type": "integer",
            "format": "int32"
          },
          "altText": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "imageUrl": {
            "type": "string",
            "nullable": true
          },
          "publicId": {
            "type": "string",
            "nullable": true
          },
          "altText": {
            "type": "string",
            "nullable": true
          },
          "isPrimary": {
            "type": "boolean"
          },
          "displayOrder": {
            "type": "integer",
            "format": "int32"
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.RegisterSellerShopRequest": {
        "type": "object",
        "properties": {
          "shopName": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "phoneNumber": {
            "type": "string",
            "nullable": true
          },
          "address": {
            "type": "string",
            "nullable": true
          },
          "verificationImage": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.RejectSellerShopRequest": {
        "type": "object",
        "properties": {
          "reason": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.ReorderProductImageItem": {
        "type": "object",
        "properties": {
          "imageId": {
            "type": "string",
            "format": "uuid"
          },
          "displayOrder": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.ReorderProductImagesRequest": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.ReorderProductImageItem"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.SellerActivityResponse": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "nullable": true
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "referenceId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.SellerDashboardResponse": {
        "type": "object",
        "properties": {
          "wallet": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.SellerWalletSummaryResponse"
          },
          "overview": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.SellerOverviewStatisticsResponse"
          },
          "revenueOverview": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.SellerRevenueOverviewResponse"
          },
          "recentOrders": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.SellerRecentOrderResponse"
            },
            "nullable": true
          },
          "topSellingProducts": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.SellerTopProductResponse"
            },
            "nullable": true
          },
          "recentActivities": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.SellerActivityResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.SellerOverviewStatisticsResponse": {
        "type": "object",
        "properties": {
          "totalProducts": {
            "type": "integer",
            "format": "int32"
          },
          "totalOrders": {
            "type": "integer",
            "format": "int32"
          },
          "totalCustomers": {
            "type": "integer",
            "format": "int32"
          },
          "totalRevenue": {
            "type": "number",
            "format": "double"
          },
          "productGrowthPercentage": {
            "type": "number",
            "format": "double"
          },
          "orderGrowthPercentage": {
            "type": "number",
            "format": "double"
          },
          "customerGrowthPercentage": {
            "type": "number",
            "format": "double"
          },
          "revenueGrowthPercentage": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double"
          },
          "condition": {
            "type": "string",
            "nullable": true
          },
          "location": {
            "type": "string",
            "nullable": true
          },
          "isActive": {
            "type": "boolean"
          },
          "isPublic": {
            "type": "boolean"
          },
          "isApproved": {
            "type": "boolean"
          },
          "isDeleted": {
            "type": "boolean"
          },
          "viewCount": {
            "type": "integer",
            "format": "int32"
          },
          "categoryId": {
            "type": "string",
            "format": "uuid"
          },
          "categoryName": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "primaryImageUrl": {
            "type": "string",
            "nullable": true
          },
          "images": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.SellerRecentOrderResponse": {
        "type": "object",
        "properties": {
          "orderId": {
            "type": "string",
            "format": "uuid"
          },
          "orderCode": {
            "type": "string",
            "nullable": true
          },
          "buyerId": {
            "type": "string",
            "format": "uuid"
          },
          "customerName": {
            "type": "string",
            "nullable": true
          },
          "sellerTotal": {
            "type": "number",
            "format": "double"
          },
          "status": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.SellerRevenueOverviewResponse": {
        "type": "object",
        "properties": {
          "today": {
            "type": "number",
            "format": "double"
          },
          "thisWeek": {
            "type": "number",
            "format": "double"
          },
          "thisMonth": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.SellerSalesReportResponse": {
        "type": "object",
        "properties": {
          "totalOrders": {
            "type": "integer",
            "format": "int32"
          },
          "totalItemsSold": {
            "type": "integer",
            "format": "int32"
          },
          "totalSales": {
            "type": "number",
            "format": "double"
          },
          "averageOrderValue": {
            "type": "number",
            "format": "double"
          },
          "startDate": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "endDate": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "status": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.SellerShopResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "shopName": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "phoneNumber": {
            "type": "string",
            "nullable": true
          },
          "address": {
            "type": "string",
            "nullable": true
          },
          "verificationImageUrl": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Domain.Enums.SellerShopStatus"
          },
          "statusText": {
            "type": "string",
            "nullable": true
          },
          "submittedAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "approvedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "rejectedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "rejectionReason": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.SellerStatisticsResponse": {
        "type": "object",
        "properties": {
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "totalProducts": {
            "type": "integer",
            "format": "int32"
          },
          "totalFollowers": {
            "type": "integer",
            "format": "int32"
          },
          "totalOrders": {
            "type": "integer",
            "format": "int32"
          },
          "averageRating": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.SellerTopProductResponse": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "format": "uuid"
          },
          "productName": {
            "type": "string",
            "nullable": true
          },
          "productImageUrl": {
            "type": "string",
            "nullable": true
          },
          "quantitySold": {
            "type": "integer",
            "format": "int32"
          },
          "revenue": {
            "type": "number",
            "format": "double"
          },
          "rank": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.SellerWalletSummaryResponse": {
        "type": "object",
        "properties": {
          "availableBalance": {
            "type": "number",
            "format": "double"
          },
          "pendingBalance": {
            "type": "number",
            "format": "double"
          },
          "withdrawnBalance": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.UpdateInventoryRequest": {
        "type": "object",
        "properties": {
          "stockQuantity": {
            "type": "integer",
            "format": "int32"
          },
          "lowStockThreshold": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.UpdateProductImageRequest": {
        "type": "object",
        "properties": {
          "altText": {
            "type": "string",
            "nullable": true
          },
          "displayOrder": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Application.DTOs.UpdateSellerProductRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double"
          },
          "categoryId": {
            "type": "string",
            "format": "uuid"
          },
          "condition": {
            "type": "string",
            "nullable": true
          },
          "location": {
            "type": "string",
            "nullable": true
          },
          "isActive": {
            "type": "boolean"
          },
          "isPublic": {
            "type": "boolean"
          },
          "images": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.ProductImageRequest"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Seller_Center.Domain.Enums.SellerShopStatus": {
        "enum": [
          0,
          1,
          2
        ],
        "type": "integer",
        "format": "int32"
      },
      "SECOM.Modules.Shipping.Application.DTOs.CreateShippingInfoRequest": {
        "type": "object",
        "properties": {
          "deliveryMethod": {
            "type": "string",
            "nullable": true
          },
          "shippingProvider": {
            "type": "string",
            "nullable": true
          },
          "receiverName": {
            "type": "string",
            "nullable": true
          },
          "receiverPhone": {
            "type": "string",
            "nullable": true
          },
          "shippingAddress": {
            "type": "string",
            "nullable": true
          },
          "note": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Shipping.Application.DTOs.ShippingInfoResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "orderId": {
            "type": "string",
            "format": "uuid"
          },
          "sellerId": {
            "type": "string",
            "format": "uuid"
          },
          "buyerId": {
            "type": "string",
            "format": "uuid"
          },
          "deliveryMethod": {
            "type": "string",
            "nullable": true
          },
          "shippingProvider": {
            "type": "string",
            "nullable": true
          },
          "trackingCode": {
            "type": "string",
            "nullable": true
          },
          "receiverName": {
            "type": "string",
            "nullable": true
          },
          "receiverPhone": {
            "type": "string",
            "nullable": true
          },
          "shippingAddress": {
            "type": "string",
            "nullable": true
          },
          "note": {
            "type": "string",
            "nullable": true
          },
          "createdAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "trackingUpdatedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "shippedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "deliveredAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "receivedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Shipping.Application.DTOs.UpdateTrackingCodeRequest": {
        "type": "object",
        "properties": {
          "trackingCode": {
            "type": "string",
            "nullable": true
          },
          "shippingProvider": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Voucher.Application.DTOs.CollectedVoucherResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "code": {
            "type": "string",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "discountType": {
            "type": "string",
            "nullable": true
          },
          "discountValue": {
            "type": "number",
            "format": "double"
          },
          "minOrderAmount": {
            "type": "number",
            "format": "double"
          },
          "maxDiscountAmount": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "quantity": {
            "type": "integer",
            "format": "int32"
          },
          "usedQuantity": {
            "type": "integer",
            "format": "int32"
          },
          "remainingQuantity": {
            "type": "integer",
            "format": "int32"
          },
          "startAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "endAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "status": {
            "type": "string",
            "nullable": true
          },
          "userVoucherId": {
            "type": "string",
            "format": "uuid"
          },
          "userVoucherStatus": {
            "type": "string",
            "nullable": true
          },
          "collectedAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "usedAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "expiredAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Voucher.Application.DTOs.CreateAdminVoucherRequest": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "discountType": {
            "type": "string",
            "nullable": true
          },
          "discountValue": {
            "type": "number",
            "format": "double"
          },
          "minOrderAmount": {
            "type": "number",
            "format": "double"
          },
          "maxDiscountAmount": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "quantity": {
            "type": "integer",
            "format": "int32"
          },
          "startAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "endAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Voucher.Application.DTOs.CreateSellerVoucherRequest": {
        "type": "object",
        "properties": {
          "sellerId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "code": {
            "type": "string",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "discountType": {
            "type": "string",
            "nullable": true
          },
          "discountValue": {
            "type": "number",
            "format": "double"
          },
          "minOrderAmount": {
            "type": "number",
            "format": "double"
          },
          "maxDiscountAmount": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "quantity": {
            "type": "integer",
            "format": "int32"
          },
          "startAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "endAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Voucher.Application.DTOs.UpdateSellerVoucherRequest": {
        "type": "object",
        "properties": {
          "sellerId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "code": {
            "type": "string",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "discountType": {
            "type": "string",
            "nullable": true
          },
          "discountValue": {
            "type": "number",
            "format": "double"
          },
          "minOrderAmount": {
            "type": "number",
            "format": "double"
          },
          "maxDiscountAmount": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "quantity": {
            "type": "integer",
            "format": "int32"
          },
          "startAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "endAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "code": {
            "type": "string",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "discountType": {
            "type": "string",
            "nullable": true
          },
          "discountValue": {
            "type": "number",
            "format": "double"
          },
          "minOrderAmount": {
            "type": "number",
            "format": "double"
          },
          "maxDiscountAmount": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "quantity": {
            "type": "integer",
            "format": "int32"
          },
          "usedQuantity": {
            "type": "integer",
            "format": "int32"
          },
          "remainingQuantity": {
            "type": "integer",
            "format": "int32"
          },
          "startAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "endAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "status": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Modules.Voucher.Application.DTOs.VoucherListItemResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "code": {
            "type": "string",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "discountType": {
            "type": "string",
            "nullable": true
          },
          "discountValue": {
            "type": "number",
            "format": "double"
          },
          "minOrderAmount": {
            "type": "number",
            "format": "double"
          },
          "maxDiscountAmount": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "quantity": {
            "type": "integer",
            "format": "int32"
          },
          "usedQuantity": {
            "type": "integer",
            "format": "int32"
          },
          "remainingQuantity": {
            "type": "integer",
            "format": "int32"
          },
          "startAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "endAtUtc": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "status": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.CategoryDto"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.OrderDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.OrderDto"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.ProductDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.ProductDto"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.UserDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.UserDto"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.VoucherDto"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.ChatListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.ChatListItemResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.FollowedSellerResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.FollowedSellerResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.NotificationResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.NotificationResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.OrderListItemResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Payment.Application.DTOs.WalletTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.WalletTransactionResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Voucher.Application.DTOs.CollectedVoucherResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Voucher.Application.DTOs.CollectedVoucherResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Voucher.Application.DTOs.VoucherListItemResponse"
            },
            "nullable": true
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.AiChatResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiChatResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.AiChatbotMessageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiChatbotMessageResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.AiSentimentAnalysisResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.AiSentimentAnalysisResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.GetProductRecommendationsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.GetProductRecommendationsResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.GetSimilarProductsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.GetSimilarProductsResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.PredictProductPriceResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.PredictProductPriceResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.AI.Application.DTOs.ProductPricePredictionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.AI.Application.DTOs.ProductPricePredictionResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.AdminDashboardStatisticsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.AdminDashboardStatisticsResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.CategoryDto"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.CustomerInsightsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.CustomerInsightsResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.DashboardResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.DashboardResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.MoneyFlowResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.MoneyFlowResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.OrderDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.OrderDto"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.VoucherDto"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Discovery.Application.DTOs.HomepageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.HomepageResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Discovery.Application.DTOs.ProductComparisonResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.ProductComparisonResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Discovery.Application.DTOs.ProductDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.ProductDetailResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ChatDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.ChatDetailResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ChatMessageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.ChatMessageResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ChatThreadResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.ChatThreadResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.ProductReviewsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.ProductReviewsResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerFollowStatusResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.SellerFollowStatusResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerRatingSummaryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.SellerRatingSummaryResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.SellerRatingsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.SellerRatingsResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Engagement.Application.DTOs.WishlistPagedResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Engagement.Application.DTOs.WishlistPagedResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CartResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CartResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CheckoutSummaryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CheckoutSummaryResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.CreateOrderResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.CreateOrderResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.OrderDetailResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.OrderStatusChangeResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.OrderStatusChangeResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.BankAccountResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.BankAccountResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.OmiseWebhookResult, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.OmiseWebhookResult"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.PayOSWebhookResult, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.PayOSWebhookResult"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.PaymentTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.PaymentTransactionResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.RefundResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.RefundResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.SellerWalletResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.SellerWalletResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.VerifyPayOSPaymentResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.VerifyPayOSPaymentResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Payment.Application.DTOs.WithdrawalResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.WithdrawalResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.AddressResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Profile.Application.DTOs.AddressResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Profile.Application.DTOs.ProfileResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Profile.Application.DTOs.ProfileResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.ImportSellerProductsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.ImportSellerProductsResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.InventoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.InventoryResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerDashboardResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.SellerDashboardResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerSalesReportResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.SellerSalesReportResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.SellerShopResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerStatisticsResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.SellerStatisticsResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Shipping.Application.DTOs.ShippingInfoResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Shipping.Application.DTOs.ShippingInfoResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Modules.Voucher.Application.DTOs.VoucherDetailResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.CategoryDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.OrderDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.OrderDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.ProductDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.ProductDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.UserDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.UserDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Admin.Application.DTOs.VoucherDto, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Discovery.Application.DTOs.ProductListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.ChatListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.ChatListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.FollowedSellerResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.FollowedSellerResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.NotificationResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Engagement.Application.DTOs.NotificationResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Order.Application.DTOs.ReturnRequestResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Payment.Application.DTOs.WalletTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Payment.Application.DTOs.WalletTransactionResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Seller_Center.Application.DTOs.AdminSellerShopResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Seller_Center.Application.DTOs.SellerProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Voucher.Application.DTOs.CollectedVoucherResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Voucher.Application.DTOs.CollectedVoucherResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Pagination.PagedResult`1[[SECOM.Modules.Voucher.Application.DTOs.VoucherListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.AuthResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Responses.Auth.AuthResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[SECOM.Shared.Responses.Auth.CurrentUserResponse, SECOM.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "$ref": "#/components/schemas/SECOM.Shared.Responses.Auth.CurrentUserResponse"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Admin.Application.DTOs.CategoryStatusHistoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.CategoryStatusHistoryResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Admin.Application.DTOs.ProductModerationHistoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.ProductModerationHistoryResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Admin.Application.DTOs.UserStatusHistoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Admin.Application.DTOs.UserStatusHistoryResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Discovery.Application.DTOs.CategoryResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.CategoryResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Discovery.Application.DTOs.ViewedProductResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Discovery.Application.DTOs.ViewedProductResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Order.Application.DTOs.OrderListItemResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Order.Application.DTOs.OrderListItemResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Payment.Application.DTOs.BankAccountResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Payment.Application.DTOs.BankAccountResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Profile.Application.DTOs.AddressResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Profile.Application.DTOs.AddressResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[System.Collections.Generic.IReadOnlyList`1[[SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse, SECOM.Modules, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SECOM.Modules.Seller_Center.Application.DTOs.ProductImageResponse"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ApiResponse`1[[System.Object, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.Auth.AuthResponse": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "fullName": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "type": "string",
            "nullable": true
          },
          "roles": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          },
          "accessToken": {
            "type": "string",
            "nullable": true
          },
          "refreshToken": {
            "type": "string",
            "nullable": true
          },
          "accessTokenExpiresAtUtc": {
            "type": "string",
            "format": "date-time"
          },
          "refreshTokenExpiresAtUtc": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.Auth.CurrentUserResponse": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "fullName": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SECOM.Shared.Responses.ErrorResponse": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "nullable": true
          },
          "code": {
            "type": "string",
            "nullable": true
          },
          "errors": {
            "type": "object",
            "additionalProperties": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "nullable": true
            },
            "nullable": true
          },
          "traceId": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      }
    },
    "securitySchemes": {
      "Bearer": {
        "type": "http",
        "description": "JWT Authorization header using the Bearer scheme.",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "security": [
    {
      "Bearer": [ ]
    }
  ]
}