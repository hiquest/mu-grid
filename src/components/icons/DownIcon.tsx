import styled from "@emotion/styled";

const SvgIcon = styled.svg<{ rotated: boolean }>`
  width: 16px;
  height: 16px;
  transition: all ${({ theme }) => theme.transitions.normal} ease-in-out;
  transform: ${({ rotated }) => (rotated ? "rotate(180deg)" : "rotate(0deg")};
`;

const DownIcon: React.FC<{
  rotated?: boolean;
}> = ({ rotated = false }) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      rotated={rotated}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
      />
    </SvgIcon>
  );
};

export default DownIcon;
