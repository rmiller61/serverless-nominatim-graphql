import AWS from 'aws-sdk'
import { v4 } from 'uuid'
import {GeoArea, CreateGeoAreaInput} from '../../generated/graphql'

async function createGeoArea(
  _: unknown,
  { input }: { input: CreateGeoAreaInput },
): Promise<GeoArea> {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  const id = v4()

  const params = {
    TableName: process.env.ITEM_TABLE,
    Item: {
      ...input,
      itemId: id,
    },
  }

  await dynamoDb.put(params).promise()

  return {
    ...input,
    id,
  }
}

export default createGeoArea
