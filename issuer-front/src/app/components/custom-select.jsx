import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@material-ui/core";

const CustomSelect = ({ onChange, options, label, field }) => {
	const [value, setValue] = useState("");

	const handleChange = e => {
		const val = e.target.value;
		setValue(val);
		onChange(e, field);
	};

	return (
		<div>
			<div>{label}</div>
			<Select className="TableInputFilter Checkbox" onChange={handleChange} value={value}>
				<MenuItem value={undefined} className="DataInput">
					{""}
				</MenuItem>
				{options.map((value, key) => {
					return (
						<MenuItem value={value} key={key} className="DataInput">
							{value}
						</MenuItem>
					);
				})}
			</Select>
		</div>
	);
};

export default CustomSelect;