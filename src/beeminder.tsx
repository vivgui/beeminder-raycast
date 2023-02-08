import {
  List,
  ActionPanel,
  Action,
  popToRoot,
  showToast,
  Toast,
  Form,
  useNavigation,
} from "@raycast/api";
import { useEffect, useState } from "react";
import { fetchGoals, sendDatapoint } from "./api";
import { fromUnixTime, differenceInDays } from "date-fns";

export default function Beeminder() {
  const [goals, setGoals] = useState();
  const [loading, setLoading] = useState(true);
  const { pop } = useNavigation();

  async function fetchData() {
    setLoading(true);
    try {
      const goalsData = await fetchGoals();
      setLoading(false);

      if (goalsData.errors?.auth_token === "bad_token") {
        await showToast({
          style: Toast.Style.Failure,
          title: "Bad Auth Token",
          message: "Please check your auth token in the extension preferences.",
        });
        popToRoot();
      } else {
        // Happy path
        setGoals(goalsData);
      }
    } catch (error) {
      setLoading(false);
      await showToast({
        style: Toast.Style.Failure,
        title: "Something went wrong",
        message: "Failed to load your goals",
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function ValueForm({ goalSlug }) {
    return (
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm
              onSubmit={async (values) => {
                setLoading(true);
                await sendDatapoint(goalSlug, values.datapoint, values.comment);
                pop();
                await new Promise((resolve) => setTimeout(resolve, 1000));
                await fetchData();
              }}
            />
          </ActionPanel>
        }
      >
        <Form.TextField
          id="datapoint"
          title="Datapoint"
          placeholder={`Enter datapoint for ${goalSlug}`}
        />

        <Form.TextField id="comment" title="Comment" defaultValue="Sent from Raycast 🐝" />
      </Form>
    );
  }

  function Goals({ goalsData }) {
    return (
      <List isLoading={loading}>
        {goalsData?.map((goal) => {
          // const goalLoseDate = formatDistance(fromUnixTime(goal.losedate), new Date());
          const goalDue = goal.limsum.split("+")?.[1].split(" (")?.[0];
          let goalIcon;

          if (differenceInDays(fromUnixTime(goal.losedate), new Date()) < 1) {
            goalIcon = "🔴";
          } else if (differenceInDays(fromUnixTime(goal.losedate), new Date()) < 2) {
            goalIcon = "🟠";
          } else if (differenceInDays(fromUnixTime(goal.losedate), new Date()) < 3) {
            goalIcon = "🔵";
          } else {
            goalIcon = "🟢";
          }

          return (
            <List.Item
              key={goal.slug}
              title={goal.slug}
              subtitle={`Pledged $${goal.pledge}`}
              accessories={[{ text: `Due ${goalDue}`, icon: goalIcon }]}
              keywords={[goal.slug, goal.title]}
              actions={
                <ActionPanel>
                  <Action.Push
                    title="Enter datapoint"
                    target={<ValueForm goalSlug={goal.slug} />}
                  />
                  <Action title="Refresh data" onAction={async () => await fetchData()} />
                </ActionPanel>
              }
            />
          );
        })}
      </List>
    );
  }

  return <Goals goalsData={goals} />;
}
