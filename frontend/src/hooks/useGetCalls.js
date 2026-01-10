import { useUser } from "@clerk/clerk-react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    if (!client || !user?.id) return;

    const loadCalls = async () => {
      setIsLoading(true);

      try {
        const response = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        setCalls(response.calls || []);
      } catch (error) {
        console.error("Failed to load calls:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  const now = new Date();

  const endedCalls = calls.filter(({ state }) => {
    const { startsAt, endedAt } = state || {};
    return (startsAt && new Date(startsAt) < now) || Boolean(endedAt);
  });

  const upcomingCalls = calls.filter(({ state }) => {
    const { startsAt } = state || {};
    return startsAt && new Date(startsAt) > now;
  });

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isLoading,
  };
};
