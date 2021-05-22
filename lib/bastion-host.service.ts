import { Construct, Stack } from "@aws-cdk/core"
import { BastionHostLinux, IVpc } from "@aws-cdk/aws-ec2"

interface Props {
    vpc: IVpc
}

export class BastionHostService extends Stack {
    bastion: BastionHostLinux
    constructor(scope: Construct, props: Props) {
        super(scope, "bastion-host-service")
        this.bastion = new BastionHostLinux(this, "Bastion", {
            vpc: props.vpc,
            instanceName: "bastion-host",
        })
    }
}
