import styled from "@emotion/styled";

const IButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: 50%;
  transition: background-color ${({ theme }) => theme.transitions.normal}
    ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.iconBtnHoverBg};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.iconBtnActiveBg};
  }
`;

const IconButton: React.FC<{
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
}> = ({ icon, onClick, label }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <IButton type="button" aria-label={label} onClick={handleClick}>
      {icon}
    </IButton>
  );
};

export default IconButton;
