// Verified Variant Config TH2 23644681

export const STUDENT = {
    mssv: '23644681',
    hoTen: 'Sinh Vien', // Có thể thay bằng tên thật
};

export const VARIANT = {
    watermarkAtTop: false,
    detailPresentation: 'card' as const,
};

export const examStamp = () => {
    return new Date().getTime().toString().slice(-6);
};
