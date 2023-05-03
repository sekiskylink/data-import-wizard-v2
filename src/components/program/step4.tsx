import {
    Checkbox,
    Input,
    Stack,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Box,
} from "@chakra-ui/react";
import { GroupBase, Select } from "chakra-react-select";
import { useStore } from "effector-react";
import { getOr } from "lodash/fp";
import { ChangeEvent, useEffect } from "react";
import { Option } from "diw-utils";
import {
    $attributeMapping,
    $metadata,
    $programMapping,
    attributeMappingApi,
    programMappingApi,
} from "../../pages/program/Store";

const Step4 = () => {
    const attributeMapping = useStore($attributeMapping);
    const programMapping = useStore($programMapping);
    const metadata = useStore($metadata);
    const updateAttribute = (
        attributes: { attribute: string; value: any }[]
    ) => {
        for (const { attribute, value } of attributes) {
            attributeMappingApi.update({
                attribute,
                value,
            });
        }
    };

    useEffect(() => {
        for (const {
            value: destinationValue,
        } of metadata.destinationAttributes) {
            console.log(destinationValue);
            if (!attributeMapping[destinationValue]) {
                const search = metadata.sourceAttributes.find(
                    ({ value }) => value === destinationValue
                );
                if (search) {
                    attributeMappingApi.update({
                        attribute: `${destinationValue}.value`,
                        value: search.value,
                    });
                }
            }
        }
    }, []);

    return (
        <Stack>
            <Stack spacing="20px">
                <Text>Tracked Entity Instance Column</Text>
                <Stack direction="row" spacing="20px">
                    <Checkbox
                        isChecked={
                            programMapping.trackedEntityInstanceColumnIsManual
                        }
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            programMappingApi.update({
                                attribute: `trackedEntityInstanceColumnIsManual`,
                                value: e.target.checked,
                            })
                        }
                    >
                        Map Manually
                    </Checkbox>
                    <Box w="500px">
                        {programMapping.trackedEntityInstanceColumnIsManual ? (
                            <Input
                                value={
                                    programMapping.trackedEntityInstanceColumn
                                }
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    programMappingApi.update({
                                        attribute:
                                            "trackedEntityInstanceColumn",
                                        value: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <Select<Option, false, GroupBase<Option>>
                                value={metadata.sourceColumns.find(
                                    (val) =>
                                        val.value ===
                                        programMapping.trackedEntityInstanceColumn
                                )}
                                options={metadata.sourceColumns}
                                isClearable
                                onChange={(e) =>
                                    programMappingApi.update({
                                        attribute:
                                            "trackedEntityInstanceColumn",
                                        value: e?.value || "",
                                    })
                                }
                            />
                        )}
                    </Box>
                </Stack>
            </Stack>
            <Table size="sm">
                <Thead>
                    <Tr>
                        <Th py="20px">Destination Attribute</Th>
                        <Th textAlign="center" py="20px">
                            Mandatory
                        </Th>
                        <Th textAlign="center" py="20px">
                            Unique
                        </Th>
                        <Th textAlign="center" w="200px" py="20px">
                            Manually Map
                        </Th>
                        <Th py="20px">Source Attribute</Th>
                        <Th w="100px" py="20px">
                            Mapped?
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {metadata.destinationAttributes.map(
                        ({
                            value,
                            label,
                            unique,
                            optionSetValue,
                            code,
                            mandatory,
                        }) => (
                            <Tr key={value} borderColor="green.100">
                                <Td w="400px">{label}</Td>
                                <Td textAlign="center">
                                    <Checkbox
                                        isChecked={
                                            !!getOr(
                                                false,
                                                `${value}.compulsory`,
                                                attributeMapping
                                            )
                                        }
                                        isReadOnly={mandatory}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            attributeMappingApi.update({
                                                attribute: `${value}.compulsory`,
                                                value: e.target.checked,
                                            })
                                        }
                                    />
                                </Td>
                                <Td textAlign="center">
                                    <Checkbox
                                        isChecked={
                                            !!getOr(
                                                unique,
                                                `${value}.unique`,
                                                attributeMapping
                                            )
                                        }
                                        isReadOnly={unique}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) => {
                                            attributeMappingApi.update({
                                                attribute: `${value}.unique`,
                                                value: e.target.checked,
                                            });
                                        }}
                                    />
                                </Td>
                                <Td textAlign="center">
                                    <Checkbox
                                        isChecked={
                                            !!getOr(
                                                false,
                                                `${value}.manual`,
                                                attributeMapping
                                            )
                                        }
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            attributeMappingApi.update({
                                                attribute: `${value}.manual`,
                                                value: e.target.checked,
                                            })
                                        }
                                    />
                                </Td>
                                <Td>
                                    {!!getOr(
                                        false,
                                        `${value}.manual`,
                                        attributeMapping
                                    ) ? (
                                        <Input
                                            value={String(
                                                getOr(
                                                    "",
                                                    `${value}.value`,
                                                    attributeMapping
                                                )
                                            )}
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>
                                            ) =>
                                                attributeMappingApi.update({
                                                    attribute: `${value}.value`,
                                                    value: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        <Select<
                                            Option,
                                            false,
                                            GroupBase<Option>
                                        >
                                            value={metadata.sourceAttributes.find(
                                                (val) =>
                                                    val.value ===
                                                    getOr(
                                                        "",
                                                        `${value}.value`,
                                                        attributeMapping
                                                    )
                                            )}
                                            options={metadata.sourceAttributes}
                                            isClearable
                                            onChange={(e) =>
                                                updateAttribute([
                                                    {
                                                        attribute: `${value}.value`,
                                                        value: e?.value || "",
                                                    },
                                                    {
                                                        attribute: `${value}.unique`,
                                                        value:
                                                            !!getOr(
                                                                false,
                                                                `${value}.unique`,
                                                                attributeMapping
                                                            ) || unique,
                                                    },
                                                ])
                                            }
                                        />
                                    )}
                                </Td>
                                <Td></Td>
                            </Tr>
                        )
                    )}
                </Tbody>
            </Table>
            {/* <pre>{JSON.stringify(attributeMapping, null, 2)}</pre> */}
        </Stack>
    );
};

export default Step4;
