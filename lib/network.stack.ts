import { App, Stack } from "@aws-cdk/core"
import { IVpc, Vpc } from "@aws-cdk/aws-ec2"

export class NetworkStack extends Stack {
    readonly vpc: IVpc
    constructor(scope: App) {
        super(scope, "network-stack")
        this.vpc = new Vpc(this, "TheVPC", {
            natGateways: 1,
        })
    }
}
