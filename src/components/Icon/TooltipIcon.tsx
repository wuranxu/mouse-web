import { IconFontProps } from "@ant-design/icons/lib/components/IconFont";
import { Tooltip } from "antd";
import IconFont from "./IconFont";

export interface TooltipIconProps extends IconFontProps {
    title?: string;
}

const TooltipIcon: React.FC<TooltipIconProps> = ({ title, ...props }) => {
    return (
        <Tooltip title={title}>
            <IconFont {...props} />
        </Tooltip>
    )
}

export default TooltipIcon;