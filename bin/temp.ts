#!/usr/bin/env node
import * as cdk from "@aws-cdk/core"
import { NetworkStack } from "../lib/network.stack"
import { DatabaseService } from "../lib/database.service"
import { BastionHostService } from "../lib/bastion-host.service"

const app = new cdk.App()
const network = new NetworkStack(app)
const host = new BastionHostService(app, network)
new DatabaseService(app, {
    vpc: network.vpc,
    bastion: host.bastion,
})
