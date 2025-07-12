import { Dropdown, Menu, Typography, Tag, Space } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { TCategory } from '../../types/note';

const { Text } = Typography;

type CategorySectionProps = {
    categories: TCategory[];
    selectedCategory: string | null;
    onCategorySelect: (categoryId: string | null) => void;
};

const CategorySection = ({
    categories,
    selectedCategory,
    onCategorySelect
}: CategorySectionProps) => {
    const menu = (
        <Menu>
            <Menu.Item key="all" onClick={() => onCategorySelect(null)}>
                All Categories
            </Menu.Item>
            <Menu.Divider />
            {categories.map((category) => (
                <Menu.Item
                    key={category.id}
                    onClick={() => onCategorySelect(category.id)}
                >
                    <Space>
                        <Tag color={category.color}>{category.name}</Tag>
                    </Space>
                </Menu.Item>
            ))}
        </Menu>
    );

    const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);

    return (
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <Dropdown overlay={menu} trigger={['click']}>
                <div style={{ cursor: 'pointer' }}>
                    <Space>
                        <FolderOutlined />
                        <Text strong>
                            {selectedCategoryObj
                                ? selectedCategoryObj.name
                                : 'All Categories'}
                        </Text>
                    </Space>
                </div>
            </Dropdown>
        </div>
    );
};

export default CategorySection;