/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export type SignupResponse = {
  __typename: "SignupResponse";
  user?: User;
  token?: string;
};

export type User = {
  __typename: "User";
  client_id?: string;
  email?: string;
  first_name?: string | null;
  last_name?: string | null;
};

export type LoginResponse = {
  __typename: "LoginResponse";
  token?: string;
};

export type ResponseAxios = {
  __typename: "ResponseAxios";
  data?: AccessTokenResponse;
  status?: number | null;
};

export type AccessTokenResponse = {
  __typename: "AccessTokenResponse";
  access_token?: string;
  token_type?: string;
  expires_in?: string;
  refresh_token?: string;
  scope?: string;
};

export type AuthEndpointResponse = {
  __typename: "AuthEndpointResponse";
  auth_endpoint?: string;
};

export type LyricsResponse = {
  __typename: "LyricsResponse";
  lyrics?: string;
};

export type SignupMutation = {
  __typename: "SignupResponse";
  user: {
    __typename: "User";
    client_id: string;
    email: string;
    first_name?: string | null;
    last_name?: string | null;
  };
  token: string;
};

export type LoginMutation = {
  __typename: "LoginResponse";
  token: string;
};

export type UpdateUserMutation = {
  __typename: "User";
  client_id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
};

export type GetSpotifyAccessTokenMutation = {
  __typename: "ResponseAxios";
  data: {
    __typename: "AccessTokenResponse";
    access_token: string;
    token_type: string;
    expires_in: string;
    refresh_token: string;
    scope: string;
  };
  status?: number | null;
};

export type GetUserByIdQuery = {
  __typename: "User";
  client_id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
};

export type GetSpotifyAuthQuery = {
  __typename: "AuthEndpointResponse";
  auth_endpoint: string;
};

export type GetLyricsQuery = {
  __typename: "LyricsResponse";
  lyrics: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async Signup(clientId: string, email: string): Promise<SignupMutation> {
    const statement = `mutation Signup($clientId: String!, $email: String!) {
        signup(clientId: $clientId, email: $email) {
          __typename
          user {
            __typename
            client_id
            email
            first_name
            last_name
          }
          token
        }
      }`;
    const gqlAPIServiceArguments: any = {
      clientId,
      email
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SignupMutation>response.data.signup;
  }
  async Login(clientId: string): Promise<LoginMutation> {
    const statement = `mutation Login($clientId: String!) {
        login(clientId: $clientId) {
          __typename
          token
        }
      }`;
    const gqlAPIServiceArguments: any = {
      clientId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <LoginMutation>response.data.login;
  }
  async UpdateUser(
    clientId: string,
    payload: string
  ): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($clientId: String!, $payload: String!) {
        updateUser(clientId: $clientId, payload: $payload) {
          __typename
          client_id
          email
          first_name
          last_name
        }
      }`;
    const gqlAPIServiceArguments: any = {
      clientId,
      payload
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async GetSpotifyAccessToken(
    code: string,
    redirectUri: string
  ): Promise<GetSpotifyAccessTokenMutation> {
    const statement = `mutation GetSpotifyAccessToken($code: String!, $redirectUri: String!) {
        getSpotifyAccessToken(code: $code, redirectUri: $redirectUri) {
          __typename
          data {
            __typename
            access_token
            token_type
            expires_in
            refresh_token
            scope
          }
          status
        }
      }`;
    const gqlAPIServiceArguments: any = {
      code,
      redirectUri
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetSpotifyAccessTokenMutation>response.data.getSpotifyAccessToken;
  }
  async GetUserById(clientId: string): Promise<GetUserByIdQuery> {
    const statement = `query GetUserById($clientId: ID!) {
        getUserById(clientId: $clientId) {
          __typename
          client_id
          email
          first_name
          last_name
        }
      }`;
    const gqlAPIServiceArguments: any = {
      clientId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserByIdQuery>response.data.getUserById;
  }
  async GetSpotifyAuth(redirectUri: string): Promise<GetSpotifyAuthQuery> {
    const statement = `query GetSpotifyAuth($redirectUri: String!) {
        getSpotifyAuth(redirectUri: $redirectUri) {
          __typename
          auth_endpoint
        }
      }`;
    const gqlAPIServiceArguments: any = {
      redirectUri
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetSpotifyAuthQuery>response.data.getSpotifyAuth;
  }
  async GetLyrics(artist: string, title: string): Promise<GetLyricsQuery> {
    const statement = `query GetLyrics($artist: String!, $title: String!) {
        getLyrics(artist: $artist, title: $title) {
          __typename
          lyrics
        }
      }`;
    const gqlAPIServiceArguments: any = {
      artist,
      title
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetLyricsQuery>response.data.getLyrics;
  }
}
