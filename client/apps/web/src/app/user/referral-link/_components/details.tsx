import { Button, Card, CardContent, Text } from "@jamsr-ui/react";
import { SolarIcon } from "@repo/ui/config/icons";

export const ReferralDetails = () => {
  return (
    <Card>
      <CardContent className="flex items-center gap-12 pl-12">
        <div>image</div>

        <div className="flex-1">
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="bg-background border-divider flex items-center justify-center rounded-xl border p-8">
              <div className="flex items-center gap-4">
                <div>
                  <SolarIcon.UsersGroup className="size-10" />
                </div>
                <div>
                  <Text
                    as="p"
                    variant="paragraph2"
                    className="text-foreground-secondary font-semibold uppercase"
                  >
                    Total Referrals
                  </Text>
                  <Text
                    variant="h3"
                    className="mt-1"
                  >
                    32
                  </Text>
                </div>
              </div>
            </div>
            <div className="bg-background border-divider flex items-center justify-center rounded-xl border p-8">
              <div className="flex items-center gap-4">
                <div>
                  <SolarIcon.DollarMinimalistic className="size-10" />
                </div>
                <div>
                  <Text
                    as="p"
                    variant="paragraph2"
                    className="text-foreground-secondary font-semibold uppercase"
                  >
                    Total Earned
                  </Text>
                  <Text
                    variant="h3"
                    className="mt-1"
                  >
                    $250
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Text
              as="p"
              variant="paragraph2"
              className="text-foreground-secondary mb-3 font-medium"
            >
              Your Referral Link 👇
            </Text>

            <Button
              fullWidth
              disableRipple
              size="lg"
              variant="flat"
              className="mb-6 justify-start"
            >
              https://next-mlm.vercel.app/referral/1006090
            </Button>

            <Text
              as="p"
              variant="paragraph"
              className="text-foreground-secondary"
            >
              Get <span className="text-success">$100</span> for each invited
              user
            </Text>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
