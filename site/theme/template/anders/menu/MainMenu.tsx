import * as React from "react";

import { ButtonSample } from "../buttons/ButtonSample";
import { ErrorPath } from "./ErrorPath";
export interface MySampleProps {
    /**
     * pathname为'components/uuv/'时，sampleName为uuv
     */
    sampleName: string;
}
interface MainMenuState {

}
/**
 * 不知道为什么，不能使用react-router-dom，我用if语句代替
 * 访问路径http://localhost:8001/components/menu/
 * 1.路径必须以components开头
 * 2.component后面只能有一级，如果要分类，就使用__
 *   如:http://localhost:8001/components/buttons__ButtonSample/
 */
export class MainMenu extends React.Component<MySampleProps, MainMenuState> {
    /**
      * 渲染
      * @returns 
      */
    render() {

        // return <div>{this.props.sampleName}</div>
        return <>
            <a href={`/components/menu/`}>
                menu
            </a>
            {this.renderContent()}
        </>
    }
    private renderMenu() {
        const containerCss = {
            // "display": "flex",
            // listStyle: "none",
            // backgroundColor: "#486a8e"
        }
        const itemCss: React.CSSProperties = {
            // backgroundColor: "#12459e",
            // outline: "1px solid #fff",
            // color: "#fff",
            // padding: "1em"

        }
        const olCss: React.CSSProperties = {
            listStyle:"disc inside"            
        }
        const ulCss: React.CSSProperties = {
            listStyle:"square inside",
            textIndent:"2em"
        }
        return <div style={containerCss}>
            <ol style={olCss}>
                <li>buttons
                    <ul style={ulCss}>
                        <li>
                            <a style={itemCss} href={`/components/buttons__ButtonSample/`}>
                                ButtonSample
                            </a>
                        </li>
                    </ul>
                </li>
                <li>reactHook
                    <ul style={ulCss}>
                        <li>
                            <a style={itemCss} href={`/hooks/HooksExample1/`}>
                                HooksExample1
                            </a>
                        </li>
                        <li>
                            <a style={itemCss} href={`/hooks/HookEffectDemo/`}>
                                HookEffectDemo
                            </a>
                        </li>

                    </ul>
                </li>

            </ol>
        </div>
    }
    private renderContent() {
        if (this.props.sampleName === `menu`) {
            return this.renderMenu();
        } else if (this.props.sampleName === `buttons__ButtonSample`) {
            return <ButtonSample></ButtonSample>
        } else {
            return <ErrorPath></ErrorPath>
        }

    }
}
