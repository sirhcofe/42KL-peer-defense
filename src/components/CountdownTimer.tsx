import { Box, Text, Heading } from "@chakra-ui/react";
import { useCountdown } from "@/utils/useCountdown";

// get target date
// const [targetDate, setTargetDate] = React.useState(
//   new Date().setDate(new Date().getDate() + 3),
// );

// get status using set state
// status={setStatus === 'Active' ? 'Ongoing' : setStatus}

const CountdownTimer = ({
  targetDate,
  status,
}: {
  targetDate: number;
  status: string;
}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <Box>
      <Heading
        as="h3"
        fontWeight="400"
        fontSize="16px"
        lineHeight="21px"
        mb="12px"
      >
        Participation {status}
      </Heading>
      <Box display="flex" gap="8px">
        <DatetimeDisplay value={days < 0 ? 0 : days} type={"days"} />
        <Text fontWeight="500" fontSize="20px">
          :
        </Text>
        <DatetimeDisplay value={hours < 0 ? 0 : hours} type={"hours"} />
        <Text fontWeight="500" fontSize="20px">
          :
        </Text>
        <DatetimeDisplay value={minutes < 0 ? 0 : minutes} type={"min"} />
        <Text fontWeight="500" fontSize="20px">
          :
        </Text>
        <DatetimeDisplay value={seconds < 0 ? 0 : seconds} type={"sec"} />
      </Box>
    </Box>
  );
};

interface DatetimeDisplayType {
  value: number;
  type: string;
}

const DatetimeDisplay = ({ value, type }: DatetimeDisplayType) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Text fontWeight="500" fontSize="22px">
        {value}
      </Text>
      <Text color="text.custom1">{type}</Text>
    </Box>
  );
};

export default CountdownTimer;
